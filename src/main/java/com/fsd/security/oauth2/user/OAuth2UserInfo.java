package com.fsd.security.oauth2.user;

import java.util.Map;

/* OAuth2 사용자 정보 추상 클래스 */
public abstract class OAuth2UserInfo {

    /* 속성 저장 */
    protected Map<String, Object> attributes;

    /* 생성자 */
    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    /* 속성 조회 */
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /* 아이디 조회 */
    public abstract String getId();

    /* 이름 조회 */
    public abstract String getName();

    /* 이메일 조회 */
    public abstract String getEmail();

    /* 이미지 URL 조회 */
    public abstract String getImageUrl();
} 