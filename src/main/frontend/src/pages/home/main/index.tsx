import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20">
      {/* 히어로 섹션 */}
      <section className="text-center py-10 sm:py-16 md:py-20 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-6">
          <span className="block">Feature-Sliced</span>
          <span className="block bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent">Design Architecture</span>
        </h1>
        <p className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 mb-8 sm:mb-10">
          프론트엔드 개발을 위한 체계적인 아키텍처 방법론 - 프로젝트 규모에 따라 확장 가능하고 지속 가능한 코드 구조를 제공합니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link 
            to="/a" 
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-primary text-white rounded-md shadow-sm hover:from-indigo-700 hover:to-primary/90 transition-all font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              시작하기
            </span>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              <span className="hidden sm:inline">GitHub 저장소</span>
              <span className="sm:hidden">GitHub</span>
            </span>
          </a>
        </div>
      </section>
      
      {/* 핵심 원칙 섹션 */}
      <section className="py-8 sm:py-10 md:py-12 px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">핵심 원칙</h2>
          <p className="max-w-xs sm:max-w-lg md:max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-500">
            Feature-Sliced Design은 기능 중심으로 코드를 체계적으로 구성하여 개발 효율성과 확장성을 향상시킵니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
              title: "기능 중심",
              description: "비즈니스 도메인과 기능을 중심으로 코드를 구성합니다. 각 기능은 독립적이며 재사용 가능한 형태로 설계됩니다."
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
              title: "계층 구조",
              description: "명확한 계층 구조로 각 기능의 책임과 역할을 분리합니다. 앱, 프로세스, 페이지, 위젯, 피처, 엔티티, 쉐어드 계층으로 구성됩니다."
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />,
              title: "단방향 의존성",
              description: "하위 레이어는 상위 레이어에 의존할 수 없어 유지보수가 용이합니다. 이를 통해 변경 사항의 영향을 최소화합니다."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="sm:flex sm:items-start">
                <div className="p-2 bg-primary/10 rounded-lg inline-flex sm:mr-4 mb-3 sm:mb-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 예시 코드 섹션 */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl mx-4">
        <div className="max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">구조 예시</h2>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">project-structure.txt</div>
            </div>
            <div className="p-3 sm:p-4 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-300 font-mono">
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
      
      {/* 통계 & 사례 통합 섹션 */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">실제 사용 사례</h2>
          <p className="max-w-xs sm:max-w-lg md:max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-500">
            다양한 규모의 프로젝트에서 Feature-Sliced Design이 어떻게 적용되고 있는지 살펴보세요.
          </p>
        </div>
        
        {/* 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {[
            { 
              number: "1,000+", 
              label: "개발자",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            },
            { 
              number: "300+", 
              label: "프로젝트",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            },
            { 
              number: "50+", 
              label: "기업",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            }
          ].map((stat, index) => (
            <div key={index} className="p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="hidden sm:block sm:mr-4">
                  <div className="p-2 bg-primary/10 rounded-lg inline-flex">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {stat.icon}
                    </svg>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 적용 사례 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-xl sm:max-w-3xl md:max-w-5xl mx-auto">
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
              title: "대규모 e커머스 플랫폼",
              description: "수백 개의 컴포넌트로 구성된 복잡한 e커머스 플랫폼에서 FSD를 적용하여 코드 관리성을 대폭 향상시켰습니다.",
              tags: ["React", "TypeScript", "Redux"]
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
              title: "모바일 뱅킹 앱",
              description: "보안이 중요한 금융 애플리케이션에서 FSD를 통해 기능별 접근 권한과 테스트를 효율적으로 관리했습니다.",
              tags: ["Vue.js", "TypeScript", "Pinia"]
            }
          ].map((case_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="sm:flex">
                <div className="sm:w-1/3 h-32 sm:h-auto bg-gradient-to-r from-indigo-50 to-blue-50 flex items-center justify-center p-4">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {case_.icon}
                  </svg>
                </div>
                <div className="p-4 sm:p-6 sm:w-2/3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{case_.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{case_.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {case_.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA 섹션 */}
      <section className="py-10 sm:py-12 md:py-16 text-center bg-gradient-to-br from-indigo-50 to-primary/10 rounded-2xl mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">지금 시작해보세요</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-xl md:max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
          Feature-Sliced Design으로 코드 구조화의 복잡성을 해결하고 확장 가능한 프론트엔드 아키텍처를 구축하세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Link 
            to="/a" 
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">문서 살펴보기</span>
              <span className="sm:hidden">문서</span>
            </span>
          </Link>
          <Link 
            to="/a/sub2" 
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-700 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="hidden sm:inline">예제 코드 보기</span>
              <span className="sm:hidden">예제</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MainPage; 