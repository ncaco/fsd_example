import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const AMainPage: React.FC = () => {
  // Redux에서 사용자 정보 가져오기
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="py-6">
      {/* 헤더 */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">섹션 A</h1>
        <p className="text-gray-600 max-w-2xl">
          {isAuthenticated ? (
            <>
              안녕하세요, {user?.nm}님! Feature-Sliced Design 패턴에서 'pages' 레이어에 위치한 섹션입니다.
            </>
          ) : (
            'Feature-Sliced Design 패턴에서 pages 레이어에 위치한 섹션입니다.'
          )}
        </p>
      </header>

      {/* 기능 카드 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div 
              key={item} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">기능 {item}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  이 기능은 Feature-Sliced Design 패턴으로 설계되어 재사용성과 유지보수성이 뛰어납니다.
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary mr-2">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>컴포넌트 기반 구조</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary mr-2">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>분리된 비즈니스 로직</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 하단 섹션 */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">추가 정보</h2>
        <p className="text-gray-600 mb-4">
          Feature-Sliced Design에 대한 자세한 정보와 가이드를 확인하세요.
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition-colors text-sm font-medium">
            문서 보기
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
            예제 확인
          </button>
        </div>
      </section>
    </div>
  );
};

export default AMainPage;