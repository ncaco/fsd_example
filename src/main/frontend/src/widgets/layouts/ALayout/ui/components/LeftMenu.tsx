import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TopLogo from './LeftComp/topLogo';
import RenderMenuItem from './LeftComp/renderMenuItem';
import BottomSection from './LeftComp/bottomSection';
import ToggleButton from './LeftComp/toggleButton';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon'; 

interface MenuItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const LeftMenu: React.FC = () => {
  console.log('-----LeftMenu Rendered-----');
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  const onToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    console.log('-----LeftMenu useEffect-----');
    
    const menuList = [
      { to: '/a/sub1', icon: <CreateIcon iconKey="start" />, label: '시작하기' },
      { to: '/a/sub2', icon: <CreateIcon iconKey="example" />, label: '예제' },
      { to: '/a/sub3', icon: <CreateIcon iconKey="user" />, label: '사용자' },
      { to: '/a/sub4', icon: <CreateIcon iconKey="document" />, label: '문서' },
      { to: '/a/sub5', icon: <CreateIcon iconKey="setting" />, label: '설정' },
      { to: '/a/sub6', icon: <CreateIcon iconKey="event" />, label: '이벤트' },
    ]

    setMenuList(menuList);
  }, []);

  return (
    <>
      {/* 사이드바 - 접히거나 펼쳐지는 너비, 전체 높이 */}
      <div className={`h-full border-r border-gray-300 bg-white flex-shrink-0 relative ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className={`h-screen flex flex-col ${isCollapsed ? 'px-1 py-6' : 'px-3 py-6'} relative`}>
          {/* 로고 - 고정 영역 */}
          <TopLogo isCollapsed={isCollapsed} />
          
          {/* 대시보드 - 고정 영역 */}
          <div className="flex-shrink-0 mb-6">
            <RenderMenuItem
              to="/a"
              icon={<CreateIcon iconKey="dashboard" />}
              label="대시보드"
              isCollapsed={isCollapsed}
            />
          </div>
          
          {/* 스크롤 가능한 메뉴 영역 */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
            {/* 문서 메뉴 그룹 */}
            <div className="mb-6">
              <nav className="space-y-1">
                {menuList.map((menu) => (
                  <RenderMenuItem
                    key={uuidv4()}
                    to={menu.to}
                    icon={menu.icon}
                    label={menu.label}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </nav>
            </div>
          </div>
          
          {/* 설정 및 로그아웃 - 고정 영역 */}
          <BottomSection isCollapsed={isCollapsed} />

          {/* 토글 버튼 */}
          <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />
          
        </div>
      </div>
    </>
  );
}; 