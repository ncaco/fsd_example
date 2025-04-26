package com.fsd.api.a.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.fsd.api.a.auth.dto.LoginRequest;
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
    
    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(A_LoginController.class);

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        logger.info("로그인 요청: {}", loginRequest.getEmail());
        
        User user = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        
        // 세션에 사용자 정보 저장
        session.setAttribute("userId", user.getId());
        session.setAttribute("userEmail", user.getEmail());
        
        return ResponseEntity.ok(LoginResponse.fromUser(user));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(HttpSession session) {
        logger.info("로그아웃 요청");
            
        authService.logout(session);
        
        return ResponseEntity.ok(LogoutResponse.success());
    }
    
    @GetMapping("/session-info")
    public ResponseEntity<Map<String, Object>> getSessionInfo(HttpSession session) {
        Map<String, Object> sessionInfo = new HashMap<>();
        
        Long userId = (Long) session.getAttribute("userId");
        String userEmail = (String) session.getAttribute("userEmail");
        
        sessionInfo.put("isLoggedIn", userId != null);
        sessionInfo.put("userId", userId);
        sessionInfo.put("userEmail", userEmail);
        sessionInfo.put("sessionId", session.getId());
        
        return ResponseEntity.ok(sessionInfo);
    }
}
