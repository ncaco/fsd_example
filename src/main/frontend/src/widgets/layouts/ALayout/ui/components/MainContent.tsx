import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainContent: React.FC = () => {
  console.log('-----MainContent Rendered-----');

  return (
    <>
      {/* 모바일(mb) 사이즈에서는 하단 메뉴 영역만큼 패딩을 추가 */}
      <div className="h-full overflow-auto bg-white pb-20 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      /* Tailwind로 숨기려면 custom CSS 필요, 아래 inline style은 Firefox/IE, 아래 ::-webkit-scrollbar는 Chrome/Safari */
      >
        {/* <UserInfoDisplay /> */}
        <Outlet />
      </div>
    </>
  );
}; 