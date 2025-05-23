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
        LOGGER.info("\n----------------------------------메뉴 목록 조회----------------------------------");
        LOGGER.info("siteId: {}", siteId);
        
        try {
            /** 선언 */
            List<Menu> menuList = new ArrayList<>();
            
            /** 메뉴 목록 조회 */
            Menu menu = new Menu();
            menu.setSiteId(siteId);
            menu.setUseYn("Y");
            menuList = menuService.getMenuList(menu);
            
            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 목록 조회 완료----------------------------------");
            return ResponseUtil.success("메뉴 목록 조회 성공", menuList);
        } catch (Exception e) {
            LOGGER.error("메뉴 목록 조회 중 오류 발생", e);
            return ResponseUtil.error("메뉴 목록 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }
    
    /** 등록 */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createMenu(@RequestBody Menu menu) {
        LOGGER.info("\n----------------------------------메뉴 등록----------------------------------");   
        try {
            /** 등록 */
            Menu createdMenu = menuService.createMenu(menu);

            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 등록 완료----------------------------------");
            return ResponseUtil.success("메뉴 등록 성공", createdMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 등록 중 오류 발생", e);
            return ResponseUtil.error("메뉴 등록 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 수정 */
    @PutMapping("/{sn}")
    public ResponseEntity<Map<String, Object>> updateMenu(@PathVariable Integer sn, @RequestBody Menu menu) {
        LOGGER.info("\n----------------------------------메뉴 수정----------------------------------");
        try {
            /** 수정 */
            Menu updatedMenu = menuService.updateMenu(sn, menu);

            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 수정 완료----------------------------------");
            return ResponseUtil.success("메뉴 수정 성공", updatedMenu);
        } catch (Exception e) {
            LOGGER.error("메뉴 수정 중 오류 발생", e);
            return ResponseUtil.error("메뉴 수정 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 삭제 */
    @DeleteMapping("/{sn}")
    public ResponseEntity<Map<String, Object>> deleteMenu(@PathVariable Integer sn) {
        LOGGER.info("\n----------------------------------메뉴 삭제----------------------------------");
        try {
            /** 삭제 */
            menuService.deleteMenu(sn);

            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 삭제 완료----------------------------------");
            return ResponseUtil.success("메뉴 삭제 성공");
        } catch (Exception e) {
            LOGGER.error("메뉴 삭제 중 오류 발생", e);
            return ResponseUtil.error("메뉴 삭제 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 메뉴 트리 조회 */
    @GetMapping("/tree")
    public ResponseEntity<Map<String, Object>> getMenuTreeList(@RequestParam(name = "siteId", required = true) String siteId) {
        LOGGER.info("\n----------------------------------메뉴 트리 조회----------------------------------");
        LOGGER.info("siteId: {}", siteId);
        
        try {
            /** 메뉴 트리 조회 */
            List<Menu> menuTreeList = menuService.getMenuTreeList(siteId);

            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 트리 조회 완료----------------------------------");
            return ResponseUtil.success("메뉴 트리 조회 성공", menuTreeList);
        } catch (Exception e) {
            LOGGER.error("메뉴 트리 조회 중 오류 발생", e);
            return ResponseUtil.error("메뉴 트리 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 사용여부 변경 */    
    @PutMapping("/setUseYn")
    public ResponseEntity<Map<String, Object>> setUseYn(@RequestBody Menu menu) {
        LOGGER.info("\n----------------------------------사용여부 변경----------------------------------");
        LOGGER.info("menuSn: {}", menu.getMenuSn());
        LOGGER.info("useYn: {}", menu.getUseYn());
        
        try {
            /** 사용여부 변경 */
            menuService.setUseYn(menu.getMenuSn(), menu.getUseYn());

            /** 반환 */
            LOGGER.info("\n----------------------------------사용여부 변경 완료----------------------------------");
            return ResponseUtil.success("사용여부 변경 성공");
        } catch (Exception e) {
            LOGGER.error("사용여부 변경 중 오류 발생", e);
            return ResponseUtil.error("사용여부 변경 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 노출여부 변경 */
    @PutMapping("/setExpsrYn")
    public ResponseEntity<Map<String, Object>> setExpsrYn(@RequestBody Menu menu) {
        LOGGER.info("\n----------------------------------노출여부 변경----------------------------------");
        LOGGER.info("menuSn: {}", menu.getMenuSn());
        LOGGER.info("expsrYn: {}", menu.getExpsrYn());

        try {
            /** 노출여부 변경 */
            menuService.setExpsrYn(menu.getMenuSn(), menu.getExpsrYn());

            /** 반환 */
            LOGGER.info("\n----------------------------------노출여부 변경 완료----------------------------------");
            return ResponseUtil.success("노출여부 변경 성공");
        } catch (Exception e) {
            LOGGER.error("노출여부 변경 중 오류 발생", e);
            return ResponseUtil.error("노출여부 변경 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /** 메뉴 이동 */
    @PutMapping("/move")
    public ResponseEntity<Map<String, Object>> moveMenu(@RequestBody Menu menu) {
        LOGGER.info("\n----------------------------------메뉴 이동----------------------------------");
        LOGGER.info("menuSn: {}", menu.getMenuSn());
        LOGGER.info("menuUpSn: {}", menu.getMenuUpSn());
        LOGGER.info("sortSn: {}", menu.getSortSn());

        try {
            /** 메뉴 이동 */
            menuService.moveMenu(menu.getMenuSn(), menu.getMenuUpSn(), menu.getSortSn());

            /** 반환 */
            LOGGER.info("\n----------------------------------메뉴 이동 완료----------------------------------");
            return ResponseUtil.success("메뉴 이동 성공");
        } catch (Exception e) {
            LOGGER.error("메뉴 이동 중 오류 발생", e);
            return ResponseUtil.error("메뉴 이동 중 오류가 발생했습니다.", e.getMessage());
        }
    }
}
