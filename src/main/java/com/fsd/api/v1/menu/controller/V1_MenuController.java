package com.fsd.api.v1.menu.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import com.fsd.model.Menu;
import com.fsd.api.v1.menu.service.V1_MenuService;
import com.fsd.common.utils.response.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/v1/menu")
public class V1_MenuController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(V1_MenuController.class);

    @Autowired
    private V1_MenuService menuService;

    /**
     * 메뉴 목록 조회
     * @param request
     * @return
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllMenus(@RequestParam(name = "siteId", required = true) String siteId) {
        LOGGER.info("----------------------------------메뉴 목록 조회----------------------------------");
        LOGGER.info("siteId: {}", siteId);
        
        try {
            /** 선언 */
            List<Menu> menuList = new ArrayList<>();
            
            /** 메뉴 목록 조회 */
            Menu menu = new Menu();
            menu.setSiteId(siteId);
            menu.setIsActive(true);
            menuList = menuService.getMenuList(menu);
            
            /** 반환 */
            LOGGER.info("----------------------------------메뉴 목록 조회 완료----------------------------------");
            return ResponseUtil.success("메뉴 목록 조회 성공", menuList);
        } catch (Exception e) {
            LOGGER.error("메뉴 목록 조회 중 오류 발생", e);
            return ResponseUtil.error("메뉴 목록 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }
    
    /** 등록 */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createMenu(@RequestBody Menu menu) {
        LOGGER.info("----------------------------------메뉴 등록----------------------------------");   
        try {
            /** 등록 */
            Menu createdMenu = menuService.createMenu(menu);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 등록 완료----------------------------------");
            return ResponseUtil.success("메뉴 등록 성공", createdMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 등록 중 오류 발생", e);
            return ResponseUtil.error("메뉴 등록 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 수정 */
    @PutMapping("/{sn}")
    public ResponseEntity<Map<String, Object>> updateMenu(@PathVariable Long sn, @RequestBody Menu menu) {
        LOGGER.info("----------------------------------메뉴 수정----------------------------------");
        try {
            /** 수정 */
            Menu updatedMenu = menuService.updateMenu(sn, menu);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 수정 완료----------------------------------");
            return ResponseUtil.success("메뉴 수정 성공", updatedMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 수정 중 오류 발생", e);
            return ResponseUtil.error("메뉴 수정 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 삭제 */
    @DeleteMapping("/{sn}")
    public ResponseEntity<Map<String, Object>> deleteMenu(@PathVariable Long sn) {
        LOGGER.info("----------------------------------메뉴 삭제----------------------------------");
        try {
            /** 삭제 */
            menuService.deleteMenu(sn);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 삭제 완료----------------------------------");
            return ResponseUtil.success("메뉴 삭제 성공");
        } catch (Exception e) {
            LOGGER.error("메뉴 삭제 중 오류 발생", e);
            return ResponseUtil.error("메뉴 삭제 중 오류가 발생했습니다.", e.getMessage());
        }
    }
}
