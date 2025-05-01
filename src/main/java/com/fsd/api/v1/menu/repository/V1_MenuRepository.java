package com.fsd.api.v1.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.fsd.model.Menu;

import java.util.List;

@Repository
public interface V1_MenuRepository extends JpaRepository<Menu, Long> {
    
    @Query("""
        SELECT m FROM Menu m 
        WHERE m.siteId = :siteId
            AND m.parentMenu IS NULL
        ORDER BY m.menuOrder ASC
    """)
    List<Menu> findBySiteId(String siteId);
    


}
