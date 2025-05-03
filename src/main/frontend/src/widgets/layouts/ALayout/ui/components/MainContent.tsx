import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainContent: React.FC = () => {
  console.log('-----MainContent Rendered-----');

  return (
    <>
      {/* 모바일(mb) 사이즈에서는 하단 메뉴 영역만큼 패딩을 추가 */}
      <div
        className="
          overflow-auto bg-white py-3 px-3
          h-[calc(100vh-104px)]
          md:h-[calc(100vh-52px)]
        "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* <UserInfoDisplay /> */}
        <Outlet />
      </div>
    </>
  );
}; 