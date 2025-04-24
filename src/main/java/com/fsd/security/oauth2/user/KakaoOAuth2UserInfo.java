package com.fsd.security.oauth2.user;

import java.util.Map;

/* 카카오 속성 조회 */
public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    /* 카카오 속성 조회 */
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    /* 아이디 조회 */
    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    /* 이름 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        if (properties == null) {
            return null;
        }
        return (String) properties.get("nickname");
    }

    /* 이메일 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getEmail() {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        if (kakaoAccount == null) {
            return null;
        }
        return (String) kakaoAccount.get("email");
    }

    /* 이미지 URL 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        if (properties == null) {
            return null;
        }
        return (String) properties.get("profile_image");
    }
} 