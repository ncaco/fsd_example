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

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "TB_MENU")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MENU_SN", nullable = false)
    private Long menuSn;    //메뉴 일련번호

    @Column(name = "SITE_ID", nullable = false, length = 100)
    private String siteId;    //사이트 아이디

    @Column(name = "MENU_NAME", nullable = false, length = 100)
    private String menuName;    //메뉴 이름

    @Column(name = "MENU_URL", length = 255)
    private String menuUrl;    //메뉴 URL

    @Column(name = "MENU_ICON", length = 100)
    private String menuIcon;    //메뉴 아이콘
    
    @Column(name = "MENU_LEVEL", nullable = false)
    private Integer menuLevel;    //메뉴 레벨
    
    @Column(name = "MENU_ORDER")
    private Integer menuOrder;    //메뉴 순서
    
    @Column(name = "IS_EXTERNAL_URL", nullable = false)
    private Boolean isExternalUrl;    //외부 URL 여부
    
    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive;    //활성화 여부
    
    @Column(name = "IS_VISIBLE", nullable = false)
    private Boolean isVisible;    //보여짐 여부
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_MENU_ID")
    @JsonIgnore
    private Menu parentMenu;    //부모 메뉴
    
    @OneToMany(mappedBy = "parentMenu")
    @Builder.Default
    private List<Menu> childMenus = new ArrayList<>();    //자식 메뉴 목록

    @Override
    public String toString() {
        return "Menu{" +
                "menuSn=" + menuSn +
                ", menuName='" + menuName + '\'' +
                ", childMenus=" + (childMenus != null ? childMenus.stream().map(Menu::getMenuName).collect(Collectors.toList()) : null) +
                '}';
    }
}