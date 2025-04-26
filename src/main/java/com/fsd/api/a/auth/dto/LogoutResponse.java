package com.fsd.api.a.auth.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import com.fsd.common.utils.BaseResponse;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class LogoutResponse extends BaseResponse {
    
    public static LogoutResponse success() {
        return LogoutResponse.builder()
                .status(true)
                .statusCode(200)
                .message("로그아웃 성공")
                .build();
    }

    public static LogoutResponse error(String message) {
        return LogoutResponse.builder()
                .status(false)
                .statusCode(401)
                .message("로그아웃 실패")
                .build();
    }
} 