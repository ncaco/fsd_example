package com.fsd.api.v1.menu.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

import com.fsd.model.Menu;
import com.fsd.api.v1.menu.repository.V1_MenuRepository;

@Service
public class V1_MenuService {
    private static final Logger LOGGER = LoggerFactory.getLogger(V1_MenuService.class);

    @Autowired
    private V1_MenuRepository menuRepository;

    public List<Menu> getMenuList(Menu menu) {
        return menuRepository.findAll(menu);
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Integer sn, Menu menu) {
        return menuRepository.save(menu);
    }

    public void deleteMenu(Integer sn) {
        menuRepository.deleteById(sn);
    }

    /**
     * 메뉴 트리 구조로 조회
     * 계층 구조가 정리된 메뉴 트리를 반환합니다.
     */
    public List<Menu> getMenuTreeList(String siteId) {
        LOGGER.info("메뉴 트리 조회 시작 - 사이트 ID: {}", siteId);
        
        List<Menu> allMenus = menuRepository.findMenuTreeBySiteId(siteId);
        LOGGER.info("조회된 전체 메뉴 수: {}", allMenus.size());
        
        List<Menu> rootMenus = buildMenuTree(allMenus);
        LOGGER.info("변환된 루트 메뉴 수: {}", rootMenus.size());
        
        // 각 메뉴의 자식 메뉴 수 로깅
        for (Menu rootMenu : rootMenus) {
            LOGGER.info("루트 메뉴: {} (ID: {}), 자식 메뉴 수: {}", 
                rootMenu.getMenuNm(), 
                rootMenu.getMenuSn(), 
                rootMenu.getChildMenus() != null ? rootMenu.getChildMenus().size() : 0);
            
            if (rootMenu.getChildMenus() != null && !rootMenu.getChildMenus().isEmpty()) {
                for (Menu childMenu : rootMenu.getChildMenus()) {
                    LOGGER.info("    - 자식 메뉴: {} (ID: {})", childMenu.getMenuNm(), childMenu.getMenuSn());
                }
            }
        }
        
        return rootMenus;
    }
    
    /**
     * 평면화된 메뉴 리스트를 트리 구조로 변환
     * 
     * @param allMenus 모든 메뉴 목록
     * @return 트리 구조로 변환된 최상위 메뉴 목록
     */
    private List<Menu> buildMenuTree(List<Menu> allMenus) {
        // 메뉴 ID를 키로 하는 맵 생성
        Map<Integer, Menu> menuMap = new HashMap<>();
        
        // 최상위 메뉴 목록
        List<Menu> rootMenus = new ArrayList<>();
        
        // 모든 메뉴를 맵에 추가
        for (Menu menu : allMenus) {
            // childMenus가 null이면 초기화
            if (menu.getChildMenus() == null) {
                menu.setChildMenus(new ArrayList<>());
            } else {
                // 기존 자식 메뉴 목록을 비웁니다 (새로 구성 예정)
                menu.getChildMenus().clear();
                LOGGER.info("메뉴 {} (ID: {})의 자식 메뉴 목록 초기화", menu.getMenuNm(), menu.getMenuSn());
            }
            
            menuMap.put(menu.getMenuSn(), menu);
        }
        
        // 부모-자식 관계 설정
        for (Menu menu : allMenus) {
            // 최상위 메뉴인 경우 (상위 메뉴 번호가 0)
            if (menu.getMenuUpSn() == 0) {
                rootMenus.add(menu);
                LOGGER.info("루트 메뉴로 추가: {} (ID: {})", menu.getMenuNm(), menu.getMenuSn());
            } else {
                // 부모 메뉴에 현재 메뉴를 자식으로 추가
                Menu parentMenu = menuMap.get(menu.getMenuUpSn());
                if (parentMenu != null) {
                    // 중복 추가 방지를 위한 체크 (이미 충분히 초기화했으므로 불필요)
                    parentMenu.getChildMenus().add(menu);
                    LOGGER.info("부모 메뉴 {} (ID: {})에 자식 메뉴 {} (ID: {}) 추가", 
                        parentMenu.getMenuNm(), parentMenu.getMenuSn(), 
                        menu.getMenuNm(), menu.getMenuSn());
                } else {
                    LOGGER.warn("메뉴 {} (ID: {})의 부모 메뉴 (ID: {})를 찾을 수 없습니다.", 
                        menu.getMenuNm(), menu.getMenuSn(), menu.getMenuUpSn());
                }
            }
        }
        
        // 자식 메뉴들을 정렬
        for (Menu menu : allMenus) {
            if (menu.getChildMenus() != null && !menu.getChildMenus().isEmpty()) {
                menu.getChildMenus().sort((m1, m2) -> m1.getSortSn() - m2.getSortSn());
            }
        }
        
        // 루트 메뉴 정렬
        rootMenus.sort((m1, m2) -> m1.getSortSn() - m2.getSortSn());
        
        return rootMenus;
    }

    /**
     * 사용여부 변경
     */
    @Transactional
    public void setUseYn(Integer menuSn, String useYn) {
        menuRepository.setUseYn(menuSn, useYn);
    }
}