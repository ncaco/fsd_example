package com.fsd.api.a.auth.dto;

import com.fsd.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import com.fsd.common.utils.BaseResponse;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class LoginResponse extends BaseResponse {
    private User user;

    public static LoginResponse fromUser(Boolean status, String message, User user) {
        return LoginResponse.builder()
                .status(status)
                .message(message)
                .user(user)
                .build();
    }
} 