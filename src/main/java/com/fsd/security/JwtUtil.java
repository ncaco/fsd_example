package com.fsd.security;

import com.fsd.security.exception.JwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            throw handleJwtException(e);
        }
    }
    
    public Date extractExpiration(String token) {
        try {
            return extractClaim(token, Claims::getExpiration);
        } catch (Exception e) {
            throw handleJwtException(e);
        }
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            logger.error("JWT 토큰이 만료되었습니다: {}", e.getMessage());
            throw new JwtException("JWT 토큰이 만료되었습니다", e);
        } catch (UnsupportedJwtException e) {
            logger.error("지원되지 않는 JWT 토큰입니다: {}", e.getMessage());
            throw new JwtException("지원되지 않는 JWT 토큰입니다", e);
        } catch (MalformedJwtException e) {
            logger.error("잘못된 형식의 JWT 토큰입니다: {}", e.getMessage());
            throw new JwtException("잘못된 형식의 JWT 토큰입니다", e);
        } catch (SignatureException e) {
            logger.error("잘못된 JWT 서명입니다: {}", e.getMessage());
            throw new JwtException("잘못된 JWT 서명입니다", e);
        } catch (Exception e) {
            logger.error("JWT 토큰 처리 중 오류가 발생했습니다: {}", e.getMessage());
            throw new JwtException("JWT 토큰 처리 중 오류가 발생했습니다", e);
        }
    }
    
    private Boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            throw handleJwtException(e);
        }
    }
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10시간
                .signWith(key)
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            throw handleJwtException(e);
        }
    }
    
    private JwtException handleJwtException(Exception e) {
        if (e instanceof JwtException) {
            return (JwtException) e;
        }
        logger.error("JWT 토큰 처리 중 오류가 발생했습니다: {}", e.getMessage());
        return new JwtException("JWT 토큰 처리 중 오류가 발생했습니다", e);
    }
} 