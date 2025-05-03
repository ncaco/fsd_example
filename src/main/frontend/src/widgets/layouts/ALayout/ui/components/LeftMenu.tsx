import React, { useState, useEffect } from 'react';

import TopLogo from './LeftComp/topLogo';
import BottomSection from './LeftComp/bottomSection';
import ToggleButton from './LeftComp/toggleButton';
import MenuScroll from './LeftComp/menuScroll';

import { MobileBottomMenu } from './MobileBottomMenu';
import { menuApi } from '@/features/menu/api/menu';
import { Menu } from '@/entities/menu';

export const LeftMenu: React.FC = () => {
  console.log('-----LeftMenu Rendered-----');
  
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('-----MenuScroll useEffect-----');
    
    const fetchMenus = async () => {
        try {
            setLoading(true);
            const menuList = await menuApi.getMenuList("a");
            setMenuList(menuList);
        } catch (error) {
            console.error('메뉴 목록을 불러오는 중 오류가 발생했습니다:', error);
            // 오류 발생 시 기본 메뉴 표시
            const fallbackMenus: Menu[] = [];
            setMenuList(fallbackMenus);
        } finally {
            setLoading(false);
        }
    };

    fetchMenus();
}, []);
  
  // 로컬 스토리지에서 초기값을 가져오고, 없으면 true로 설정
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('isCollapsed');
    return saved !== null ? JSON.parse(saved) : true; // 기본값은 true
  });
  
  const onToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('isCollapsed', JSON.stringify(newCollapsedState)); // 상태 변경 시 로컬 스토리지에 저장
  };


  return (
    <>
      {/* hidden sm:block을 추가하여 모바일에서는 숨기고 sm 브레이크포인트(640px) 이상에서만 보이도록 설정 */}
      <div className={`hidden md:block h-full border-r border-gray-300 bg-white flex-shrink-0 relative ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`h-screen flex flex-col ${isCollapsed ? 'px-1 py-3' : 'px-3 py-3'} relative`}>
          {/* 로고 - 고정 영역 */}
          <TopLogo isCollapsed={isCollapsed} />
          
          {/* 스크롤 가능한 메뉴 영역 */}
          <MenuScroll 
            isCollapsed={isCollapsed} 
            loading={loading}
            menuList={menuList.filter(menu => 
              menu.expsrYn === 'Y' &&
              menu.menuPosCd === 'C002'
            )} 
          />
          
          {/* 설정 및 로그아웃 - 고정 영역 */}
          <BottomSection 
            isCollapsed={isCollapsed} 
            menuList={menuList.filter(menu => 
              menu.expsrYn === 'Y' &&
              menu.menuPosCd === 'C004'
            )} 
            loading={loading}
          />

          {/* 토글 버튼 */}
          <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />
          
        </div>
      </div>

      
      {/* 반응형에서 하단 메뉴 */}
      <MobileBottomMenu
        menuList={menuList.filter(menu => 
          menu.expsrYn === 'Y' &&
          menu.moblUseYn === 'Y'
        )}
      />
    </>
  );
}; 