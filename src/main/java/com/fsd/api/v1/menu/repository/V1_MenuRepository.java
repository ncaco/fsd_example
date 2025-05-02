package com.fsd.api.v1.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fsd.model.Menu;

import java.util.List;

@Repository
public interface V1_MenuRepository extends JpaRepository<Menu, Long> {
    
    @Query("""
        SELECT m FROM Menu m 
        WHERE 
            m.siteId = :#{#menu.siteId}
            AND m.useYn = :#{#menu.useYn}
            AND m.menuUpSn = 0
        ORDER BY m.sortSn ASC
    """)
    List<Menu> findAll(@Param("menu") Menu menu);
    


}
