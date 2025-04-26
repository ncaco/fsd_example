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
                .statusCode(200)
                .statusMessage("로그인 성공")
                .user(user)
                .build();
    }

    public static LoginResponse error(String message) {
        //메세지 형식에 따른 결과 처리 "" 사이 문자열만 출력
        //401 UNAUTHORIZED "이메일 또는 비밀번호가 올바르지 않습니다."
        //첫번째 공백까지가 문자열을 코드 //두번째 공백까지가 메세지 //나머지 문자열을 추가 메세지
        String[] parts = message.split(" ", 3);
        String statusCode = parts[0];
        //String statusMessage = parts[1];
        String additionalMessage = parts.length > 2 ? parts[2] : "";
        
        return LoginResponse.builder()
                .status(false)
                .statusCode(Integer.parseInt(statusCode))
                .statusMessage(additionalMessage)
                .build();
    }
} 