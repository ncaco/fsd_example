package com.fsd.api.a.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogoutResponse {
    private String message;
    
    public static LogoutResponse success() {
        return LogoutResponse.builder()
                .message("로그아웃 성공")
                .build();
    }
} 