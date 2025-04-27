package com.fsd.common.utils.token;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class TokenUtils {

    private static final String ACCESS_TOKEN_SECRET = "accessTokenSecret";
    private static final String REFRESH_TOKEN_SECRET = "refreshTokenSecret";

    /** 액세스 토큰 생성 */
    public static String generateAccessToken(String eml) {
        return Jwts.builder()
            .setSubject(eml)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30분
            .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET)
            .compact();
    }

    /** 리프레시 토큰 생성 */
    public static String generateRefreshToken(String eml) {
        return Jwts.builder()
            .setSubject(eml)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7일
            .signWith(SignatureAlgorithm.HS256, REFRESH_TOKEN_SECRET)
            .compact();
    }

    /** 액세스 토큰 검증 */
    public static boolean validateAccessToken(String token) {
        return validateToken(token, ACCESS_TOKEN_SECRET);
    }

    /** 리프레시 토큰 검증 */
    public static boolean validateRefreshToken(String token) {
        return validateToken(token, REFRESH_TOKEN_SECRET);
    }

    private static boolean validateToken(String token, String secret) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /** 토큰에서 이메일 추출 */
    public static String getEmailFromToken(String token, String secret) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
