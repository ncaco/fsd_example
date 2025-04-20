import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const ALayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-800 hover:text-white';
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 상단 네비게이션 */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center mr-3 group-hover:bg-indigo-500 transition-colors">
                  <span className="font-bold text-xs">FSD-A</span>
                </div>
                <span className="text-white font-semibold">가이드 센터</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <Link to="/" className="bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-600 transition-colors">
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* 사이드바 */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20">
              <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                  <h3 className="text-lg font-medium text-white">문서 내비게이션</h3>
                  <p className="mt-1 text-sm text-gray-400">FSD 아키텍처 가이드</p>
                </div>
                <div className="bg-gray-800 px-4 py-5 sm:p-6">
                  <nav className="space-y-1">
                    <Link 
                      to="/a" 
                      className={`group flex items-center px-3 py-2 rounded-md ${isActive('/a')}`}
                    >
                      <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>개요</span>
                    </Link>
                    <Link 
                      to="/a/sub1" 
                      className={`group flex items-center px-3 py-2 rounded-md ${isActive('/a/sub1')}`}
                    >
                      <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>시작하기</span>
                    </Link>
                    <Link 
                      to="/a/sub2" 
                      className={`group flex items-center px-3 py-2 rounded-md ${isActive('/a/sub2')}`}
                    >
                      <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>예제</span>
                    </Link>
                  </nav>
                </div>
              </div>
              
              {/* 추가 리소스 카드 */}
              <div className="bg-gradient-to-br from-indigo-700 to-purple-700 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-white text-lg font-semibold mb-3">추가 리소스</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-indigo-100 hover:text-white transition-colors">
                        <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>공식 문서 다운로드</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-indigo-100 hover:text-white transition-colors">
                        <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <span>실제 구현 예제</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-indigo-100 hover:text-white transition-colors">
                        <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span>커뮤니티 포럼</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          
          {/* 메인 콘텐츠 */}
          <main className="mt-8 lg:mt-0 lg:col-span-9">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                <h2 className="text-xl font-bold text-white">Feature-Sliced Design</h2>
                <p className="mt-1 max-w-2xl text-sm text-indigo-200">프론트엔드 아키텍처의 새로운 패러다임</p>
              </div>
              <div className="px-4 py-5 sm:p-6 bg-gray-800">
                <Outlet />
              </div>
            </div>
            
            {/* 하단 카드 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">아이디어 제안</h3>
                  </div>
                  <p className="text-gray-300">
                    FSD 아키텍처 개선을 위한 아이디어나 제안사항이 있으신가요? 언제든 의견을 공유해주세요.
                  </p>
                  <div className="mt-5">
                    <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      제안하기
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">최신 소식</h3>
                  </div>
                  <p className="text-gray-300">
                    FSD 아키텍처 관련 최신 업데이트와 커뮤니티 소식을 구독해보세요.
                  </p>
                  <div className="mt-5">
                    <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      구독하기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* 푸터 */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} FSD 가이드 | 모든 권리 보유
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 