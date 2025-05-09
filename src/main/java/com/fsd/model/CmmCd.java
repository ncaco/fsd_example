package com.fsd.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "TB_CMM_CD")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(CmmCd.CmmCdId.class)
public class CmmCd {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CmmCdId implements Serializable {
        private String upCmmCd;
        private String cmmCd;
    }

    @Id
    @Column(name = "UP_CMM_CD", length = 4, nullable = true)
    private String upCmmCd; // 상위공통코드

    @Id
    @Column(name = "CMM_CD", length = 4, nullable = false)
    private String cmmCd; // 시스템코드

    @Column(name = "CMM_CD_NM", length = 50, nullable = false)
    private String cmmCdNm; // 시스템코드명

    @Column(name = "SORT_SN", nullable = false)
    @Builder.Default
    private Integer sortSn = 0; // 정렬순서

    @Column(name = "USE_YN", length = 1, nullable = false)
    @Builder.Default
    private String useYn = "Y"; // Y:사용함, N:사용안함

    @Column(name = "ABBR_NM", length = 300)
    private String abbrNm; // 약어명

    @Column(name = "USE_BGNG_YMD", length = 8)
    private String useBgngYmd; // 사용시작일시

    @Column(name = "USE_END_YMD", length = 8)
    private String useEndYmd; // 사용종료일시

    @Column(name = "RGTR_ID", length = 50, nullable = false)
    private String rgtrId; // 등록자아이디

    @Column(name = "REG_DT", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDt; // 등록일시

    @Column(name = "MDFR_ID", length = 50)
    private String mdfrId; // 수정자아이디

    @Column(name = "MDFCN_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date mdfcnDt; // 수정일시
}