import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LeftMenuProps {
  isCollapsed: boolean;
}

export const LeftMenu: React.FC<LeftMenuProps> = ({ isCollapsed }) => {
  console.log('-----LeftMenu Rendered-----');

  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-red-600 text-white font-medium' 
      : 'text-gray-700 hover:bg-gray-100 hover:text-red-600';
  };

  // 메뉴 아이템 렌더링 함수
  const renderMenuItem = (
    to: string, 
    icon: React.ReactNode, 
    label: string
  ) => {
    return (
      <Link 
        to={to} 
        className={`group flex items-center ${isCollapsed ? 'justify-center px-1' : 'px-3'} py-2 rounded-md ${isActive(to)}`}
        title={isCollapsed ? label : ""}
      >
        <div className="flex-shrink-0">{icon}</div>
        {!isCollapsed && <span className="ml-3 truncate whitespace-nowrap">{label}</span>}
      </Link>
    );
  };

  return (
    <div className={`h-screen flex flex-col ${isCollapsed ? 'px-1 py-6' : 'px-3 py-6'} overflow-x-hidden`}>
      {/* 로고 - 고정 영역 */}
      <div className="flex-shrink-0 mb-8 flex justify-center">
        <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
          <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center">
            <span className="font-bold text-sm text-white">FSD</span>
          </div>
          {!isCollapsed && <span className="ml-3 text-xl font-semibold text-gray-900 truncate whitespace-nowrap">아키텍처</span>}
        </div>
      </div>
      
      {/* 대시보드 - 고정 영역 */}
      <div className="flex-shrink-0 mb-6">
        {renderMenuItem(
          "/a",
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>,
          "대시보드"
        )}
      </div>
      
      {/* 스크롤 가능한 메뉴 영역 */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
        {/* 문서 메뉴 그룹 */}
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className={`${isCollapsed ? 'px-1' : 'px-3'} text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 truncate whitespace-nowrap`}>
              문서
            </h3>
          )}
          <nav className="space-y-1">
            {renderMenuItem(
              "/a/sub1",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>,
              "시작하기"
            )}
            {renderMenuItem(
              "/a/sub2",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>,
              "예제"
            )}
            {renderMenuItem(
              "/a/resources",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>,
              "리소스"
            )}
          </nav>
        </div>
        
        {/* 커뮤니티 메뉴 그룹 */}
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className={`${isCollapsed ? 'px-1' : 'px-3'} text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 truncate whitespace-nowrap`}>
              커뮤니티
            </h3>
          )}
          <nav className="space-y-1">
            {renderMenuItem(
              "/a/forum",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>,
              "포럼"
            )}
            {renderMenuItem(
              "/a/contribute",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>,
              "기여하기"
            )}
            
            {/* 추가 메뉴 항목들 */}
            {renderMenuItem(
              "/a/tutorials",
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>,
              "튜토리얼"
            )}
          </nav>
        </div>
      </div>
      
      {/* 설정 및 로그아웃 - 고정 영역 */}
      <div className="flex-shrink-0 mt-4 border-t border-gray-200 pt-4">
        <nav className="space-y-1">
          {renderMenuItem(
            "/a/settings",
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>,
            "설정"
          )}
          <button 
            className={`w-full text-left group flex items-center ${isCollapsed ? 'justify-center px-1' : 'px-3'} py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600`}
          >
            <div className="flex-shrink-0">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            {!isCollapsed && <span className="ml-3 truncate whitespace-nowrap">로그아웃</span>}
          </button>
        </nav>
      </div>
    </div>
  );
}; 