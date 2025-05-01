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
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;
import com.fsd.model.Menu;
import com.fsd.api.v1.menu.service.V1_MenuService;
import com.fsd.common.utils.request.HttpRequestUtils;

import jakarta.servlet.http.HttpServletRequest;

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
    public ResponseEntity<List<Menu>> getAllMenus(HttpServletRequest request) {
        LOGGER.info("----------------------------------메뉴 목록 조회----------------------------------");
        
        try {
            /** 선언 */
            List<Menu> menuList = new ArrayList<>();
            
            /** 사이트 아이디 조회 */
            String siteId = HttpRequestUtils.getSiteId(request);
            if (siteId == null) {
                return ResponseEntity.badRequest().body(menuList);
            }

            /** 메뉴 목록 조회 */
            menuList = menuService.getMenuList(siteId);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 목록 조회 완료----------------------------------");
            return ResponseEntity.ok(menuList);
        } catch (Exception e) {
            LOGGER.error("메뉴 목록 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /** 등록 */
    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        LOGGER.info("----------------------------------메뉴 등록----------------------------------");   
        try {
            /** 등록 */
            Menu createdMenu = menuService.createMenu(menu);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 등록 완료----------------------------------");
            return ResponseEntity.ok(createdMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 등록 중 오류 발생", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** 수정 */
    @PutMapping("/{sn}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long sn, @RequestBody Menu menu) {
        LOGGER.info("----------------------------------메뉴 수정----------------------------------");
        try {
            /** 수정 */
            Menu updatedMenu = menuService.updateMenu(sn, menu);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 수정 완료----------------------------------");
            return ResponseEntity.ok(updatedMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 수정 중 오류 발생", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** 삭제 */
    @DeleteMapping("/{sn}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long sn) {
        LOGGER.info("----------------------------------메뉴 삭제----------------------------------");
        try {
            /** 삭제 */
            menuService.deleteMenu(sn);

            /** 반환 */
            LOGGER.info("----------------------------------메뉴 삭제 완료----------------------------------");
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            LOGGER.error("메뉴 삭제 중 오류 발생", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
