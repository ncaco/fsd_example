import React from 'react';

const ASub1Page: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">서브1 페이지</h1>
        <p className="text-gray-500 max-w-xl">
          Feature-Sliced Design 패턴의 서브 페이지 영역입니다.
        </p>
      </header>
      
      {/* 검색 영역 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
            <div className="w-4 h-4 border-2 border-current rounded-full"></div>
          </div>
        </div>
        <button className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          검색
        </button>
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="bg-white border border-gray-100 rounded-lg p-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-primary/30 rounded-full"></div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">서브1 컴포넌트</h2>
        <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
          이 영역은 서브1 페이지의 주요 컴포넌트를 보여주는 공간입니다.
        </p>
        <div className="w-full max-w-md h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-primary"></div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          <span className="mr-2">다음</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ASub1Page; 