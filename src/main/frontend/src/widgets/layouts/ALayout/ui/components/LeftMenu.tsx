import React, { useState } from 'react';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon'; 

import TopLogo from './LeftComp/topLogo';
import RenderMenuItem from './LeftComp/renderMenuItem';
import BottomSection from './LeftComp/bottomSection';
import ToggleButton from './LeftComp/toggleButton';
import MenuScroll from './LeftComp/menuScroll';
import { User } from '@/types/a/user';

export const LeftMenu: React.FC<{ user: User | null }> = ({ user }) => {
  console.log('-----LeftMenu Rendered-----');
  
  
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
          <BottomSection isCollapsed={isCollapsed} user={user} />

          {/* 토글 버튼 */}
          <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />
          
        </div>
      </div>
    </>
  );
}; 