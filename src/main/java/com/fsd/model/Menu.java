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

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

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
    private Long menuSn;

    @Column(name = "SITE_ID", nullable = false, length = 100)
    private String siteId;

    @Column(name = "MENU_NAME", nullable = false, length = 100)
    private String menuName;

    @Column(name = "MENU_URL", length = 255)
    private String menuUrl;

    @Column(name = "MENU_ICON", length = 100)
    private String menuIcon;
    
    @Column(name = "MENU_LEVEL", nullable = false)
    private Integer menuLevel;
    
    @Column(name = "MENU_ORDER")
    private Integer menuOrder;
    
    @Column(name = "IS_EXTERNAL_URL", nullable = false)
    private Boolean isExternalUrl;
    
    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive;
    
    @Column(name = "IS_VISIBLE", nullable = false)
    private Boolean isVisible;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_MENU_ID")
    private Menu parentMenu;
    
    @OneToMany(mappedBy = "parentMenu")
    @Builder.Default
    private List<Menu> childMenus = new ArrayList<>();
}
