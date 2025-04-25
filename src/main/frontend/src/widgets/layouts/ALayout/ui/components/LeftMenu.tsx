import React, { useState } from 'react';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon'; 

import TopLogo from './LeftComp/topLogo';
import RenderMenuItem from './LeftComp/renderMenuItem';
import BottomSection from './LeftComp/bottomSection';
import ToggleButton from './LeftComp/toggleButton';
import MenuScroll from './LeftComp/menuScroll';

export const LeftMenu: React.FC = () => {
  console.log('-----LeftMenu Rendered-----');
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const onToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          <div className="flex-shrink-0 mb-3">
            <RenderMenuItem
              to="/a"
              icon={<CreateIcon iconKey="dashboard" />}
              label="대시보드"
              isCollapsed={isCollapsed}
            />
          </div>
          
          {/* 스크롤 가능한 메뉴 영역 */}
          <MenuScroll isCollapsed={isCollapsed}/>
          
          {/* 설정 및 로그아웃 - 고정 영역 */}
          <BottomSection isCollapsed={isCollapsed} />

          {/* 토글 버튼 */}
          <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />
          
        </div>
      </div>
    </>
  );
}; 