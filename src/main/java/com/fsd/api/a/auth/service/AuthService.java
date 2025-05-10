package com.fsd.api.a.auth.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fsd.model.User;
import com.fsd.api.a.auth.repository.UserRepository;
import com.fsd.common.utils.session.SessionUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    private final UserRepository userRepository;
    
    /** 로그인 */
    public User login(String eml, String pswd) {
        logger.debug("로그인 시도: {}", eml);

        // 아이디로 조회
        Optional<User> userOptional = userRepository.findByEml(eml);
        
        if (userOptional.isEmpty()) {
            logger.info("로그인 실패: 사용자를 찾을 수 없음 - {}", eml);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        User user = userOptional.get();

        // 비밀번호 검증
        if (!user.getPswd().equals(pswd)) {
            logger.info("로그인 실패: 비밀번호 불일치 - {}", eml);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 로그인 성공
        logger.info("사용자 로그인 성공: {}", eml);

        return user;
    }

    /** 로그아웃 */
    public void logout(HttpServletRequest request) {
        if (request != null) {
            try {
                SessionUtil.removeSession_A(request);
                logger.info("사용자 로그아웃 처리 완료");
            } catch (Exception e) {
                logger.warn("로그아웃 처리 중 오류 발생: {}", e.getMessage());
            }
        }
    }
    
    /** 데모 계정 조회 */
    public User getDemoAccount() {
        logger.info("데모 계정 조회 시작");

        User user = userRepository.findByEml("admin").orElse(null);

        //데모 계정 없을경우 데모 계정 하나 생성함.
        if (user == null) {
            logger.info("데모 계정 생성 시작");
            user = User.builder()
                .nm("관리자")
                .eml("admin")
                .pswd("password")
                .build();
            user = userRepository.save(user);
            logger.info("데모 계정 생성 완료");
        }

        logger.debug("데모 계정 조회 완료: {}", user.toString());
        return user;
    }

    /** 이메일로 사용자 조회 */
    public User findUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEml(email);
        if (userOptional.isEmpty()) {
            logger.info("사용자 조회 실패: {}", email);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자를 찾을 수 없습니다.");
        }
        return userOptional.get();
    }
} 