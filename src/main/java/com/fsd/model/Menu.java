package com.fsd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Collectors;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "TB_MENU")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENU_SN", nullable = false)
    private Integer menuSn;    // 메뉴일련번호

    @Column(name = "SITE_ID", nullable = false, length = 10)
    @Builder.Default
    private String siteId = "a";    // 사이트아이디

    @Column(name = "MENU_VER")
    private Float menuVer;    // 메뉴버전

    @Column(name = "MENU_UP_SN", nullable = false)
    private Integer menuUpSn;    // 메뉴상위일련번호
    
    @Column(name = "MENU_NM", nullable = false, length = 50)
    private String menuNm;    // 메뉴명

    @Column(name = "MENU_SE_CD", nullable = false, length = 4)
    private String menuSeCd;    // 메뉴구분코드(U001) / 프로그램(C001) / 게시판(C002) / 콘텐츠(C003) / 링크(C004)

    @Column(name = "MENU_HELP_CN", columnDefinition = "TEXT")
    private String menuHelpCn;    // 메뉴도움말내용

    @Column(name = "PRGRM_ID", length = 7)
    private String prgrmId;    // 프로그램아이디

    @Column(name = "BBS_ID", length = 7)
    private String bbsId;    // 게시판아이디

    @Column(name = "CONTS_ID", length = 7)
    private String contsId;    // 콘텐츠아이디

    @Column(name = "LNKG_URL", length = 200)
    private String lnkgUrl;    // 링크URL

    @Column(name = "SORT_SN", nullable = false)
    @Builder.Default
    private Integer sortSn = 0;    // 정렬일련번호

    @Column(name = "USE_YN", nullable = false, length = 1)
    @Builder.Default
    private String useYn = "Y";    // Y:사용함, N:사용안함

    @Column(name = "EXPSR_YN", length = 1)
    @Builder.Default
    private String expsrYn = "Y";    // Y:노출함, N:노출안함

    @Column(name = "MEMO_CN", length = 1000)
    private String memoCn;    // 메모내용

    @Column(name = "ICON", length = 50)
    private String icon;    // 아이콘

    @Column(name = "PIC_USE_YN", length = 1)
    private String picUseYn;    // 담당자사용여부

    @Column(name = "DGSTFN_USE_YN", length = 1)
    private String dgstfnUseYn;    // 만족도사용여부

    @Column(name = "OGNZ_SN")
    private Integer ognzSn;    // 조직일련번호

    @Column(name = "FILTER_SE_CD_LIST", length = 1000)
    private String filterSeCdList;    // 필터구분코드목록

    @Column(name = "RGTR_ID", nullable = false, length = 50)
    private String rgtrId;    // 등록자아이디

    @Column(name = "REG_DT", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDt;    // 등록일시

    @Column(name = "MDFR_ID", length = 50)
    private String mdfrId;    // 수정자아이디

    @Column(name = "MDFCN_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date mdfcnDt;    // 수정일시
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENU_UP_SN", referencedColumnName = "MENU_SN", insertable = false, updatable = false)
    @JsonIgnore
    private Menu parentMenu;    // 부모 메뉴
    
    @OneToMany(mappedBy = "parentMenu")
    @Builder.Default
    @JsonIgnore
    private List<Menu> childMenus = new ArrayList<>();    // 자식 메뉴 목록

    @Override
    public String toString() {
        return "Menu{" +
                "menuSn=" + menuSn +
                ", menuNm='" + menuNm + '\'' +
                ", icon='" + icon + '\'' +
                ", childMenus=" + (childMenus != null ? 
                    childMenus.stream()
                        .map(menu -> menu.getMenuSn() + ":" + menu.getMenuNm())
                        .collect(Collectors.toList()) : null) +
                '}';
    }
}