package com.fsd.api.a.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.common.utils.session.SessionUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/a/auth")
public class AAuthController {

    /**
     * 현재 세션 정보를 반환하는 API
     */
    @GetMapping("/session")
    public ResponseEntity<?> getSessionInfo() {
        try {
            // 세션에서 사용자 정보 가져오기
            String a_sn = SessionUtil.getASn();
            String a_nm = SessionUtil.getANm();
            String a_eml = SessionUtil.getAEml();
            
            // 값이 없으면 null 대신 빈 문자열을 반환
            Map<String, Object> sessionInfo = new HashMap<>();
            sessionInfo.put("a_sn", a_sn != null && !a_sn.isEmpty() ? a_sn : null);
            sessionInfo.put("a_nm", a_nm != null && !a_nm.isEmpty() ? a_nm : null);
            sessionInfo.put("a_eml", a_eml != null && !a_eml.isEmpty() ? a_eml : null);
            
            return ResponseEntity.ok(sessionInfo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("세션 정보 조회 실패: " + e.getMessage());
        }
    }
    
    /**
     * 로그인 상태 확인 API
     */
    @GetMapping("/check")
    public ResponseEntity<?> checkLoginStatus() {
        try {
            // 세션에서 사용자 ID 가져오기
            String a_sn = SessionUtil.getASn();
            boolean isLoggedIn = a_sn != null && !a_sn.isEmpty();
            
            Map<String, Object> result = new HashMap<>();
            result.put("isLoggedIn", isLoggedIn);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("로그인 상태 확인 실패: " + e.getMessage());
        }
    }
} 