import React from 'react';
import { LeftMenu } from './components/LeftMenu';
import { MainContent } from './components/MainContent';
import { MobileBottomMenu } from './components/MobileBottomMenu';

export const ALayout: React.FC = () => {
  console.log('-----ALayout Rendered-----');
  
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
        {/* 왼쪽 메뉴 */}
        <LeftMenu />
          
        {/* 메인 콘텐츠 - 유동적 너비, 전체 높이, 내부 스크롤 */}
        <div className="flex-1 h-full overflow-hidden">
          <div className="h-full overflow-auto">
            <MainContent />
          </div>
        </div>

        {/* 반응형에서 하단 메뉴 */}
        <MobileBottomMenu />
      </div>
    </>
  );
}; 