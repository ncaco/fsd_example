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
    private Long userId;
    private String name;
    private String email;
    private String imageUrl;
    private User.Role role;
    private String message;
    
    public static LoginResponse fromUser(User user) {
        return LoginResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .role(user.getRole())
                .message("로그인 성공")
                .build();
    }
} 