package com.fsd.common.utils.response;

import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

/**
 * API 응답 생성 유틸리티
 */
public class ResponseUtil {
    
    /**
     * 성공 응답 생성
     * @param message 성공 메시지
     * @param data 응답 데이터
     * @return ResponseEntity<Map<String, Object>> 성공 응답 객체
     */
    public static ResponseEntity<Map<String, Object>> success(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", "SUCCESS");
        response.put("message", message);
        response.put("data", data);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 성공 응답 생성 (데이터 없음)
     * @param message 성공 메시지
     * @return ResponseEntity<Map<String, Object>> 성공 응답 객체
     */
    public static ResponseEntity<Map<String, Object>> success(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", "SUCCESS");
        response.put("message", message);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 에러 응답 생성
     * @param message 에러 메시지
     * @param error 상세 에러 내용
     * @return ResponseEntity<Map<String, Object>> 에러 응답 객체
     */
    public static ResponseEntity<Map<String, Object>> error(String message, String error) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", "ERROR");
        response.put("message", message);
        response.put("error", error);
        
        return ResponseEntity.internalServerError().body(response);
    }
} 