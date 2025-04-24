package com.fsd.security.oauth2;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.fsd.model.User;

import lombok.Getter;

/* 사용자 주요 정보 */
@Getter
public class UserPrincipal implements OAuth2User, UserDetails {
    /* 사용자 ID */
    private Long id;
    
    /* 이메일 */
    private String email;
    
    /* 권한 */
    private Collection<? extends GrantedAuthority> authorities;
    
    /* 속성 */
    private Map<String, Object> attributes;

    /* 생성자 */
    private UserPrincipal(Long id, String email, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.authorities = authorities;
    }

    /* 사용자 생성 */
    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole().name()));

        return new UserPrincipal(
            user.getId(),
            user.getEmail(),
            authorities
        );
    }

    /* 사용자 생성 */
    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    /* 속성 설정 */
    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    /* 비밀번호 조회 */
    @Override
    public String getPassword() {
        return null; // OAuth2 인증에서는 패스워드를 사용하지 않음
    }

    /* 사용자 이름 조회 */
    @Override
    public String getUsername() {
        return email;
    }

    /* 계정 만료 여부 조회 */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /* 계정 잠금 여부 조회 */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /* 자격 만료 여부 조회 */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /* 사용자 활성화 여부 조회 */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /* 속성 조회 */
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /* 권한 조회 */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /* 이름 조회 */
    @Override
    public String getName() {
        return String.valueOf(id);
    }
} 