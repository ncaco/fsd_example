package com.fsd.api.a.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.fsd.api.a.auth.dto.LoginResponse;
import com.fsd.api.a.auth.dto.LogoutResponse;
import com.fsd.api.a.auth.service.AuthService;
import com.fsd.model.User;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;
import java.util.Enumeration;

import com.fsd.common.utils.token.TokenUtils;
import com.fsd.common.utils.validate.StringUtils;
@Controller
@RequestMapping("/api/a/auth")
@RequiredArgsConstructor
public class A_LoginController {
    
    private static final Logger logger = LoggerFactory.getLogger(A_LoginController.class);
    
    private final AuthService authService;

    final String accessTokenSecret = "accessTokenSecret";
    final String refreshTokenSecret = "refreshTokenSecret";
    
    /** 로그인 */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User loginRequest, HttpSession session) {
        logger.info("로그인 요청: {}, 세션 ID: {}", loginRequest.getEml(), session.getId());
        
        try {
            User user = authService.login(loginRequest.getEml(), loginRequest.getPswd());
            
            // 액세스 토큰 생성 
            String accessToken = TokenUtils.generateAccessToken(user.getEml());
            
            // 리프레시 토큰 생성 (긴 만료 시간)
            String refreshToken = TokenUtils.generateRefreshToken(user.getEml());

            // User 객체에 토큰 정보 추가
            user.setToken(accessToken);
            user.setRefreshToken(refreshToken);

            // 세션에 사용자 정보 저장
            session.setAttribute("sn", user.getSn());
            session.setAttribute("nm", user.getNm());
            session.setAttribute("eml", user.getEml());
            session.setAttribute("token", accessToken);
            session.setAttribute("refreshToken", refreshToken);
            
            logger.info("세션 정보 저장 완료: 세션 ID: {}, 사용자: {}", session.getId(), user.getEml());

            logger.info("로그인 성공: {}", user);

            return ResponseEntity.ok(LoginResponse.fromUser(true, "로그인 성공", user));
        } catch (Exception e) {
            logger.error("로그인 에러: {}", e.getMessage(), e);
            return ResponseEntity.ok(LoginResponse.error(e.getMessage()));
        }
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(HttpSession session) {
        logger.info("로그아웃 요청");
        try {
            authService.logout(session);
            return ResponseEntity.ok(LogoutResponse.success());
        } catch (Exception e) {
            return ResponseEntity.ok(LogoutResponse.error(e.getMessage()));
        }
    }

    /** 세션 정보 조회 */
    @GetMapping("/session-info")
    public ResponseEntity<Map<String, Object>> getSessionInfo(HttpSession session) {
        logger.info("세션 정보 조회 요청: 세션 ID: {}", session.getId());
        
        // 세션에 저장된 모든 속성 나열
        Enumeration<String> attributeNames = session.getAttributeNames();
        while (attributeNames.hasMoreElements()) {
            String name = attributeNames.nextElement();
            logger.info("세션 속성: {} = {}", name, session.getAttribute(name));
        }
        
        Map<String, Object> sessionInfo = new HashMap<>();
        
        String sn = StringUtils.nullConvertToString(session.getAttribute("sn"));
        String nm = StringUtils.nullConvertToString(session.getAttribute("nm"));
        String eml = StringUtils.nullConvertToString(session.getAttribute("eml"));
        String token = StringUtils.nullConvertToString(session.getAttribute("token"));
        String refreshToken = StringUtils.nullConvertToString(session.getAttribute("refreshToken"));
        
        sessionInfo.put("isLoggedIn", sn != null);
        sessionInfo.put("sn", sn);
        sessionInfo.put("nm", nm);
        sessionInfo.put("eml", eml);
        sessionInfo.put("token", token);
        sessionInfo.put("refreshToken", refreshToken);
        
        logger.info("세션 정보 조회 결과: {}", sessionInfo);
        return ResponseEntity.ok(sessionInfo);
    }

    /** 데모 계정 조회 */
    @GetMapping("/demo-account")
    public ResponseEntity<User> getDemoAccount() {
        User user = authService.getDemoAccount();
        return ResponseEntity.ok(user);
    }

    /** 토큰 갱신 */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        try {
            // 리프레시 토큰 검증
            if (!TokenUtils.validateRefreshToken(refreshToken)) {
                return ResponseEntity.ok(LoginResponse.error("리프레시 토큰 검증 실패"));
            }
            
            // 클레임에서 사용자 이메일 추출
            String eml = TokenUtils.getEmailFromToken(refreshToken, refreshTokenSecret);
            
            // 새 액세스 토큰 생성
            String newAccessToken = TokenUtils.generateAccessToken(eml);
            
            // 사용자 조회
            User user = authService.findUserByEmail(eml);
            user.setToken(newAccessToken);
            
            return ResponseEntity.ok(LoginResponse.fromUser(true, "토큰 갱신 성공", user));
        } catch (Exception e) {
            return ResponseEntity.ok(LoginResponse.error("토큰 갱신 실패: " + e.getMessage()));
        }
    }
}
