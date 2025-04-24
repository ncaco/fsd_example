package com.fsd.common.oauth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    /* 인증 없이 접근 가능한 API */
    @GetMapping("/hello")
    public ResponseEntity<?> hello() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "안녕하세요! 이 API는 인증 없이 접근 가능합니다.");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    /* 인증된 사용자만 접근 가능한 API */
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> userTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "안녕하세요! 이 API는 인증된 사용자만 접근 가능합니다.");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    /* 관리자만 접근 가능한 API */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "안녕하세요! 이 API는 관리자만 접근 가능합니다.");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
} 