package com.fsd.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_USER")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "user_sn_gen")
    @SequenceGenerator(name = "user_sn_gen", sequenceName = "user_sn", allocationSize = 1)
    @Column(name = "sn", nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long sn;

    @Column(name = "nm", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT '사용자'")
    private String nm;

    @Column(name = "eml", unique = false, nullable = false, columnDefinition = "VARCHAR(256) DEFAULT 'admin'")
    private String eml;

    @Column(name = "pswd", nullable = false, columnDefinition = "VARCHAR(256) DEFAULT 'password'")
    private String pswd;

    @Column(name = "reg_dt", nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDt;

    @Column(name = "rgtr_id", nullable = true, columnDefinition = "VARCHAR(20) DEFAULT 'admin'")
    private String rgtrId;

    @Column(name = "mod_dt", nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime modDt;

    @Column(name = "mdfr_id", nullable = true, columnDefinition = "VARCHAR(20) DEFAULT 'admin'")
    private String mdfrId;

    @Column(name = "token", nullable = true, columnDefinition = "VARCHAR(256) DEFAULT ''")
    private String token;

    @Column(name = "refresh_token", nullable = true, columnDefinition = "VARCHAR(256) DEFAULT ''")
    private String refreshToken;

    // 등록수정시간 초기값 현재시간으로 적용
    @PrePersist
    public void prePersist() {
        this.regDt = LocalDateTime.now();
        this.modDt = LocalDateTime.now();
    }


    private Boolean status;
    private Integer statusCode;
    private String message;

    // 성공 응답 생성
    public User success(int statusCode, String message) {
        return User.builder()
                .status(true)
                .statusCode(statusCode)
                .message(message)
                .build();
    }
    // 에러 응답 생성
    public User error(int statusCode, String message) {
        return User.builder()
                .status(false)
                .statusCode(statusCode)
                .message(message)
                .build();
    }
}