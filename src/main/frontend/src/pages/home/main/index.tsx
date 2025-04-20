import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* 히어로 섹션 */}
      <section className="text-center py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          <span className="block">Feature-Sliced</span>
          <span className="block text-primary">Design Architecture</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
          아키텍처 설계부터 코드 구성까지, 확장 가능하고 유지보수하기 쉬운 프론트엔드 개발을 위한 방법론입니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/a" 
            className="px-6 py-3 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition-colors font-medium"
          >
            시작하기
          </Link>
          <a 
            href="#" 
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors font-medium"
          >
            문서 보기
          </a>
        </div>
      </section>
      
      {/* 핵심 원칙 섹션 */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 원칙</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-500">
            Feature-Sliced Design은 코드를 비즈니스 기능 단위로 분할하여 구성하는 아키텍처 방법론입니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="p-2 bg-primary/10 rounded-lg inline-block mb-5">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">기능 중심</h3>
            <p className="text-gray-600">비즈니스 도메인과 기능을 중심으로 코드를 구성합니다. 각 기능은 독립적이며 재사용 가능한 형태로 설계됩니다.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="p-2 bg-primary/10 rounded-lg inline-block mb-5">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">계층 구조</h3>
            <p className="text-gray-600">명확한 계층 구조로 각 기능의 책임과 역할을 분리합니다. 앱, 프로세스, 페이지, 위젯, 피처, 엔티티, 쉐어드 계층으로 구성됩니다.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="p-2 bg-primary/10 rounded-lg inline-block mb-5">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">단방향 의존성</h3>
            <p className="text-gray-600">하위 레이어는 상위 레이어에 의존할 수 없어 유지보수가 용이합니다. 이를 통해 변경 사항의 영향을 최소화합니다.</p>
          </div>
        </div>
      </section>
      
      {/* 예시 코드 섹션 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">구조 예시</h2>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-sm">project-structure.txt</div>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono">
{`src/
├── app/                    # 애플리케이션 설정, 전역 스타일
│   ├── providers/         # 애플리케이션 전역 프로바이더
│   └── styles/            # 전역 스타일
│
├── pages/                 # 페이지 컴포넌트
│   ├── home/
│   ├── dashboard/
│   └── profile/
│
├── widgets/               # 페이지의 독립적인 블록
│   ├── header/
│   ├── sidebar/
│   └── footer/
│
├── features/              # 비즈니스 기능
│   ├── auth/
│   ├── cart/
│   └── notifications/
│
├── entities/              # 비즈니스 엔티티
│   ├── user/
│   ├── product/
│   └── order/
│
└── shared/                # 공유 유틸리티 및 UI 컴포넌트
    ├── api/
    ├── config/
    ├── lib/
    └── ui/`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      {/* 통계 섹션 */}
      <section className="py-16 bg-primary/5 rounded-2xl my-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">모던 프론트엔드 개발의 선택</h2>
            <p className="text-xl text-gray-600">많은 팀들이 FSD를 사용하여 복잡한 프론트엔드 애플리케이션을 효율적으로 관리하고 있습니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-lg text-gray-600">개발자</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-lg text-gray-600">프로젝트</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-lg text-gray-600">기업</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 적용 사례 섹션 */}
      <section className="py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">적용 사례</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-500">
            다양한 규모의 프로젝트에서 Feature-Sliced Design이 어떻게 적용되었는지 살펴보세요.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">대규모 e커머스 플랫폼</h3>
              <p className="text-gray-600 mb-4">수백 개의 컴포넌트로 구성된 복잡한 e커머스 플랫폼에서 FSD를 적용하여 코드 관리성을 대폭 향상시켰습니다.</p>
              <div className="flex items-center">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium mr-2">React</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium mr-2">TypeScript</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium">Redux</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">모바일 뱅킹 앱</h3>
              <p className="text-gray-600 mb-4">보안이 중요한 금융 애플리케이션에서 FSD를 통해 기능별 접근 권한과 테스트를 효율적으로 관리했습니다.</p>
              <div className="flex items-center">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium mr-2">Vue.js</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium mr-2">TypeScript</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium">Pinia</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA 섹션 */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">지금 시작해보세요</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Feature-Sliced Design으로 구성된 샘플 프로젝트를 살펴보고 실제 적용 방법을 알아보세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/a" 
            className="px-6 py-3 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition-colors font-medium"
          >
            데모 보기
          </Link>
          <a 
            href="#" 
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors font-medium"
          >
            GitHub 저장소
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainPage; 