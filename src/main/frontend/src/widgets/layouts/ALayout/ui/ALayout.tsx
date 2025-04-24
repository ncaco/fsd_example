import React, { useState } from 'react';
import { LeftMenu } from './components/LeftMenu';
import { MainContent } from './components/MainContent';

export const ALayout: React.FC = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  console.log('-----ALayout Rendered-----');

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
      {/* 사이드바 - 접히거나 펼쳐지는 너비, 전체 높이 */}
      <div 
        className={`h-full border-r border-gray-300 bg-white flex-shrink-0 transition-all duration-300 ease-in-out relative ${
          isMenuCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <LeftMenu isCollapsed={isMenuCollapsed} />
        
        {/* 토글 버튼 */}
        <button 
          onClick={toggleMenu}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md z-15 focus:outline-none hover:bg-gray-50"
          aria-label={isMenuCollapsed ? "메뉴 펼치기" : "메뉴 접기"}
        >
          {isMenuCollapsed ? (
            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* 메인 콘텐츠 - 유동적 너비, 전체 높이, 내부 스크롤 */}
      <div className="flex-1 h-full overflow-hidden">
        <div className="h-full overflow-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
}; 