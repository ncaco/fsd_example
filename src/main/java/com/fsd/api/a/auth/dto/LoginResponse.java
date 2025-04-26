package com.fsd.api.a.auth.dto;

import com.fsd.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private User user;
    private String message;
    
    public static LoginResponse fromUser(User user) {
        return LoginResponse.builder()
                .user(user)
                .message("로그인 성공")
                .build();
    }
} 