package com.fsd.api.a.auth.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fsd.model.User;
import com.fsd.api.a.auth.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    public User login(String email, String password) {
        // 실제 환경에서는 패스워드 검증 로직이 있어야 하지만
        // 현재 User 모델에 패스워드 필드가 없어 이메일로만 검색
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."));
        
        logger.info("사용자 로그인 성공: {}", email);
        return user;
    }
    
    public void logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
            logger.info("사용자 로그아웃 처리 완료");
        }
    }
} 