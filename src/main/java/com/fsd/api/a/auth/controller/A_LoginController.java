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

@Controller
@RequestMapping("/api/a/auth")
@RequiredArgsConstructor
public class A_LoginController {
    
    private static final Logger logger = LoggerFactory.getLogger(A_LoginController.class);
    
    private final AuthService authService;

    /** 로그인 */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User loginRequest, HttpSession session) {
        logger.info("로그인 요청: {}", loginRequest.getEml());
        
        try {
            User user = authService.login(loginRequest.getEml(), loginRequest.getPswd());
            
            // 세션에 사용자 정보 저장
            session.setAttribute("sn", user.getSn());
            session.setAttribute("nm", user.getNm());
            session.setAttribute("eml", user.getEml());
            
            return ResponseEntity.ok(LoginResponse.fromUser(true, "로그인 성공", user));
        } catch (Exception e) {
            return ResponseEntity.ok(LoginResponse.fromUser(false, e.getMessage(), null));
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
        Map<String, Object> sessionInfo = new HashMap<>();
        
        Long userSeq = (Long) session.getAttribute("userSeq");
        String userName = (String) session.getAttribute("userName");
        String userEmail = (String) session.getAttribute("userEmail");
        
        sessionInfo.put("isLoggedIn", userSeq != null);
        sessionInfo.put("userSeq", userSeq);
        sessionInfo.put("userName", userName);
        sessionInfo.put("userEmail", userEmail);
        sessionInfo.put("sessionId", session.getId());
        
        return ResponseEntity.ok(sessionInfo);
    }

    /** 데모 계정 조회 */
    @GetMapping("/demo-account")
    public ResponseEntity<User> getDemoAccount() {
        User user = authService.getDemoAccount();
        return ResponseEntity.ok(user);
    }
}
