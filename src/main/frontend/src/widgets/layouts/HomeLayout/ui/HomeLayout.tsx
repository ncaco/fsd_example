import React from 'react';
import { Outlet } from 'react-router-dom';

export const HomeLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-primary flex items-center justify-center text-white shadow-sm">
                  <span className="font-bold text-xs">FSD</span>
                </div>
                <span className="ml-3 text-lg font-semibold text-gray-900">Feature-Sliced Design</span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">기능</a>
                <a href="#examples" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">예제</a>
                <a href="#documentation" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">문서</a>
              </nav>
            </div>
            <div className="flex items-center">
              <a href="/a" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-blue-600 transition-all">
                시작하기
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
            <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">더 나은 아키텍처</span>
                  <span className="block bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent">더 나은 개발 경험</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                  Feature-Sliced Design은 프론트엔드 프로젝트를 더 체계적이고 유지보수하기 쉽게 구성할 수 있는 아키텍처 방법론입니다.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/a"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-blue-600 transition-all"
                  >
                    가이드 보기
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all"
                  >
                    GitHub 방문하기
                  </a>
                </div>
              </div>
              <div className="mt-12 md:mt-0 relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
                      <div className="flex space-x-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded-full"></div>
                        <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                        <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-10 bg-gradient-to-r from-blue-100 to-primary/10 rounded-md"></div>
                            <div className="h-10 bg-gradient-to-r from-blue-100 to-primary/10 rounded-md"></div>
                            <div className="h-10 bg-gradient-to-r from-blue-100 to-primary/10 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 hidden lg:block">
                  <svg className="w-40 h-40 text-primary/10 animate-pulse" fill="currentColor" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.4,-51.3C58.9,-39.9,70.1,-25.2,73.3,-8.9C76.4,7.4,71.5,25.3,61.1,39.5C50.8,53.8,35,64.2,17.4,69.3C-0.2,74.3,-19.6,73.9,-38.4,66.8C-57.2,59.7,-75.3,45.9,-81.2,28.3C-87.1,10.7,-80.7,-10.7,-69.8,-28.1C-58.9,-45.5,-43.5,-58.9,-27.6,-68.3C-11.7,-77.7,5.7,-83.1,20.2,-77.8C34.8,-72.5,46.3,-56.6,45.4,-51.3Z" transform="translate(100 100)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기능 섹션 */}
        <div id="features" className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                프론트엔드 개발의 새로운 표준
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
                Feature-Sliced Design으로 얻을 수 있는 이점
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-primary/20 text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">확장성</h3>
                <p className="text-gray-600">
                  프로젝트 규모가 커질수록 더 빛나는 구조화된 아키텍처로 개발 및 유지보수 비용을 줄여줍니다.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-primary/20 text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">팀 협업</h3>
                <p className="text-gray-600">
                  개발자 간 책임 영역을 명확히 구분하여 효율적인 협업과 병렬 개발이 가능합니다.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-primary/20 text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">유연성</h3>
                <p className="text-gray-600">
                  다양한 프레임워크와 라이브러리에 적용 가능한 기술에 구애받지 않는 아키텍처 패턴입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 예제 섹션 */}
        <div id="examples" className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                코드로 살펴보기
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
                실제 프로젝트에 적용된 FSD 예제를 확인해보세요
              </p>
            </div>
            
            <div className="mt-12 bg-gray-900 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.01]">
              <div className="flex items-center bg-gray-800 px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto text-gray-400 text-sm">Example Code</div>
              </div>
              <div className="p-6 text-gray-300 font-mono text-sm overflow-x-auto">
                <pre>
{`src/
  ├── app/               # 글로벌 설정, 스타일, 프로바이더
  │   ├── styles/        # 글로벌 스타일
  │   ├── providers/     # 컨텍스트 프로바이더
  │   └── index.tsx      # 앱 진입점
  │
  ├── pages/             # 애플리케이션 페이지
  │   ├── MainPage/
  │   ├── ProfilePage/
  │   └── NotFoundPage/
  │
  ├── widgets/           # 독립적인 및 재사용 가능한 블록
  │   ├── Header/
  │   └── Sidebar/
  │
  ├── features/          # 사용자 상호작용, 비즈니스 로직
  │   ├── AuthByUsername/
  │   └── ArticleRating/
  │
  ├── entities/          # 비즈니스 엔티티
  │   ├── User/
  │   └── Article/
  │
  └── shared/            # 공유 유틸리티, UI 킷, API
      ├── api/
      ├── config/
      └── ui/`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* 문서 섹션 */}
        <div id="documentation" className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  자세한 문서와 가이드
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Feature-Sliced Design을 당신의 프로젝트에 적용하는 방법을 단계별로 알아보세요. 초보자부터 전문가까지 모두를 위한 상세한 문서를 제공합니다.
                </p>
                <div className="mt-8">
                  <a
                    href="/a"
                    className="inline-flex items-center py-3 px-5 rounded-full shadow-sm bg-gradient-to-r from-blue-500 to-primary text-white font-medium hover:from-blue-600 hover:to-blue-600 transition-all"
                  >
                    문서 시작하기
                  </a>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 문서</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">아키텍처 개요 및 철학</span>
                      </li>
                      <li className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">계층 구조 및 의존성 규칙</span>
                      </li>
                      <li className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">슬라이스 생성 및 구성 방법</span>
                      </li>
                      <li className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">실제 프로젝트 마이그레이션 가이드</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 내용 출력 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-primary flex items-center justify-center text-white">
                  <span className="font-bold text-xs">FSD</span>
                </div>
                <span className="ml-3 text-lg font-semibold">Feature-Sliced Design</span>
              </div>
              <p className="mt-4 text-gray-400 text-sm max-w-md">
                Feature-Sliced Design은 프론트엔드 프로젝트를 위한 아키텍처 방법론으로, 유지보수성과 확장성을 높이기 위해 설계되었습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">리소스</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">문서</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">튜토리얼</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">예제</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">커뮤니티</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">기여하기</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">코드 기여</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">문서 개선</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">버그 리포트</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Feature-Sliced Design. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 