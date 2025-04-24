package com.fsd.security.oauth2;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/* 인증 성공 시 처리 */
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    /* 리다이렉트 URI */
    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    /* 로깅 인스턴스 */
    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);

    /* 인증 성공 시 처리 */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("응답이 이미 커밋되었습니다. " + targetUrl + "로 리다이렉트할 수 없습니다.");
            return;
        }

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    /* 리다이렉트 URI 결정 */
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = Optional.ofNullable(request.getParameter("redirect_uri"));
        
        String targetUrl = redirectUri.orElse(this.redirectUri);
        
        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            logger.error("승인되지 않은 리다이렉션 URI입니다: " + redirectUri.get());
            targetUrl = this.redirectUri;
        }
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("id", userPrincipal.getId())
                .queryParam("email", userPrincipal.getEmail())
                .build().toUriString();
    }
    
    /* 리다이렉트 URI 검증 */
    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);
        URI authorizedUri = URI.create(redirectUri);
        
        return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                && authorizedUri.getPort() == clientRedirectUri.getPort();
    }
} 