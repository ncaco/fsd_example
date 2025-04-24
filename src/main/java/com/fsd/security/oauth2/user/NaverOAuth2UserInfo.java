package com.fsd.security.oauth2.user;

import java.util.Map;

/* 네이버 속성 조회 */
public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    /* 네이버 속성 조회 */
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    /* 아이디 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        if (response == null) {
            return null;
        }
        return (String) response.get("id");
    }

    /* 이름 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        if (response == null) {
            return null;
        }
        return (String) response.get("name");
    }

    /* 이메일 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        if (response == null) {
            return null;
        }
        return (String) response.get("email");
    }

    /* 이미지 URL 조회 */
    @Override
    @SuppressWarnings("unchecked")
    public String getImageUrl() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        if (response == null) {
            return null;
        }
        return (String) response.get("profile_image");
    }
} 