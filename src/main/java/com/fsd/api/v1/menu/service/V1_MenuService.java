package com.fsd.api.v1.menu.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.fsd.model.Menu;
import com.fsd.api.v1.menu.repository.V1_MenuRepository;

@Service
public class V1_MenuService {

    @Autowired
    private V1_MenuRepository menuRepository;

    public List<Menu> getMenuList(String siteId) {
        return menuRepository.findBySiteId(siteId);
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long sn, Menu menu) {
        return menuRepository.save(menu);
    }

    public void deleteMenu(Long sn) {
        menuRepository.deleteById(sn);
    }
}
