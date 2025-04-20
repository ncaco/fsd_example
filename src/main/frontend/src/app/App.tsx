import React from 'react';
import { RouterProvider } from '@app/providers';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* 상단 내비게이션 바 */}
      <nav className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">FSD 가이드</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  대시보드
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  예제
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  문서
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                시작하기
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 헤더 섹션 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 md:flex md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Tailwind CSS 테스트</h1>
              <p className="mt-2 text-indigo-100">Feature-Sliced Design 패턴에 맞춰 구성된 프로젝트 살펴보기</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                문서 보기
              </button>
            </div>
          </div>

          {/* 카드 그리드 */}
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">주요 구성요소</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 카드 1 */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">위젯</h3>
                <p className="text-gray-600 text-sm">복합적인 UI 블록으로 다양한 기능을 담고 있습니다.</p>
              </div>
              
              {/* 카드 2 */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">엔티티</h3>
                <p className="text-gray-600 text-sm">비즈니스 도메인 객체를 표현하는 데이터 모델입니다.</p>
              </div>
              
              {/* 카드 3 */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">피쳐</h3>
                <p className="text-gray-600 text-sm">사용자 상호작용과 비즈니스 로직을 모듈화합니다.</p>
              </div>
            </div>
          </div>
          
          {/* 색상 테스트 섹션 */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">색상 테스트</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary text-white py-3 px-4 rounded-md shadow text-center font-medium">
                Primary
              </div>
              <div className="bg-indigo-600 text-white py-3 px-4 rounded-md shadow text-center font-medium">
                Indigo
              </div>
              <div className="bg-red-600 text-white py-3 px-4 rounded-md shadow text-center font-medium">
                Red
              </div>
            </div>
          </div>
          
          {/* 라우터 섹션 */}
          <div className="px-6 py-6 border-t border-gray-100">
            <RouterProvider />
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FSD 가이드. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App; 