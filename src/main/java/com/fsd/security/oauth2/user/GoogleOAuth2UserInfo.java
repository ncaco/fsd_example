package com.fsd.security.oauth2.user;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    /* 구글 속성 조회 */
    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    /* 아이디 조회 */
    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    /* 이름 조회 */
    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    /* 이메일 조회 */
    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    /* 이미지 URL 조회 */
    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
} 