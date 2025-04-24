package com.fsd.security.oauth2.user;

import java.util.Map;

/* OAuth2 사용자 정보 팩토리 */
public class OAuth2UserInfoFactory {

    /* OAuth2 사용자 정보 조회 */
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        /* 구글 로그인 */
        if(registrationId.equalsIgnoreCase("google")) {
            return new GoogleOAuth2UserInfo(attributes);
        }
        /* 네이버 로그인 */
        else if (registrationId.equalsIgnoreCase("naver")) {
            return new NaverOAuth2UserInfo(attributes);
        }
        /* 카카오 로그인 */
        else if (registrationId.equalsIgnoreCase("kakao")) {
            return new KakaoOAuth2UserInfo(attributes);
        }
        /* 지원하지 않는 로그인 방식 */
        else {
            throw new IllegalArgumentException("지원하지 않는 로그인 방식입니다: " + registrationId);
        }
    }
} 