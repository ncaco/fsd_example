import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const ALayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50';
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-64 shrink-0 md:pr-8 mb-6 md:mb-0">
            <div className="sticky top-4">
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white mr-3">
                    <span className="font-bold text-xs">FSD</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">FSD 가이드</h2>
                </div>
                <p className="text-sm text-gray-500">Feature-Sliced Design 패턴을 실제 프로젝트에 적용하기 위한 가이드입니다.</p>
              </div>
              
              <nav>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-4">문서</h3>
                <ul className="space-y-1 mb-8">
                  <li>
                    <Link 
                      to="/a" 
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${isActive('/a')}`}
                    >
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      개요
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/a/sub1" 
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${isActive('/a/sub1')}`}
                    >
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      시작하기
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/a/sub2" 
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${isActive('/a/sub2')}`}
                    >
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 7H7V16H10V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 7H14V12H17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      예제
                    </Link>
                  </li>
                </ul>
                
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-4">리소스</h3>
                <ul className="space-y-1">
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      공식 문서
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          
          <main className="flex-1 min-w-0 md:pl-8 md:border-l border-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}; 