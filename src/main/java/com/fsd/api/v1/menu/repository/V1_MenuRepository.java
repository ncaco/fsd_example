package com.fsd.api.v1.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;

import com.fsd.model.Menu;

import java.util.List;
@Repository
public interface V1_MenuRepository extends JpaRepository<Menu, Integer> {
    
    @Query("""
        SELECT m FROM Menu m 
        WHERE 
            m.siteId = :#{#menu.siteId}
            AND m.useYn = :#{#menu.useYn}
            AND m.menuUpSn = 0
        ORDER BY m.sortSn ASC
    """)
    List<Menu> findAll(@Param("menu") Menu menu);
    
    /**
     * 메뉴를 트리 구조로 조회합니다.
     * WITH RECURSIVE 구문을 사용하여 계층 구조로 가져옵니다.
     */
    @Query(nativeQuery = true, value = """
        WITH RECURSIVE MenuTree AS (
            -- 최상위 메뉴 (루트 노드)
            SELECT 
                m.*, 
                0 as level, 
                CAST(m.menu_sn AS VARCHAR(1000)) as path
            FROM 
                tb_menu m
            WHERE 
                m.site_id = :siteId 
                AND m.menu_up_sn = 0
            UNION ALL
            -- 하위 메뉴 (자식 노드)
            SELECT 
                m.*, 
                mt.level + 1 as level, 
                CONCAT(mt.path, ',', m.menu_sn) as path
            FROM 
                tb_menu m
            JOIN 
                MenuTree mt ON m.menu_up_sn = mt.menu_sn
            WHERE 
                m.site_id = :siteId
        )
        SELECT * FROM MenuTree
        ORDER BY path, sort_sn ASC
    """)
    List<Menu> findMenuTreeBySiteId(@Param("siteId") String siteId);

    /**
     * 사용여부 변경
     */
    @Modifying
    @Query("UPDATE Menu m SET m.useYn = :useYn WHERE m.menuSn = :menuSn")
    void setUseYn(@Param("menuSn") Integer menuSn, @Param("useYn") String useYn);
}
