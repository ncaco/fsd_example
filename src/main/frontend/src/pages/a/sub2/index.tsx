import React from 'react';

const ASub2Page: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">서브2 페이지</h1>
          <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-gray-500 max-w-xl">
          서브2 페이지는 리스트 컴포넌트를 보여주는 영역입니다.
        </p>
      </header>
      
      {/* 리스트 아이템들 */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between mb-3">
              <div className="flex">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="w-5 h-5 text-primary/80">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-800 mb-1">리스트 아이템 {item}</h3>
                  <p className="text-sm text-gray-500">아이템 상세 설명</p>
                </div>
              </div>
              <div className="w-6 h-6 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="6" cy="12" r="1" fill="currentColor"/>
                  <circle cx="18" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="pl-12 text-sm text-gray-600">
              <p>이 아이템은 Feature-Sliced Design 패턴에 따라 구현되었으며, 재사용 가능한 컴포넌트로 구성되어 있습니다.</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* 하단 버튼들 */}
      <div className="flex justify-between pt-4">
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
          취소
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          확인
        </button>
      </div>
    </div>
  );
};

export default ASub2Page; 