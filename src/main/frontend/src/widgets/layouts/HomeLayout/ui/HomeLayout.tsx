import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderSection } from './components/HeaderSection';
import { FooterSection } from './components/FooterSection';

export const HomeLayout: React.FC = () => {
  // 푸터 링크 정의
  const footerColumns = [
    {
      title: "문서",
      links: [
        { title: "시작하기", href: "/guide" },
        { title: "아키텍처 설명", href: "/guide/architecture" },
        { title: "모범 사례", href: "/guide/best-practices" }
      ]
    },
    {
      title: "리소스",
      links: [
        { title: "예제 코드", href: "/examples", isExternal: false },
        { title: "공식 문서", href: "https://feature-sliced.design/docs", isExternal: true },
        { title: "GitHub 저장소", href: "https://github.com/ncaco97/fsd_example", isExternal: true }
      ]
    },
    {
      title: "커뮤니티",
      links: [
        { title: "GitHub 디스커션", href: "https://github.com/ncaco97/fsd_example/discussions", isExternal: true },
        { title: "트위터", href: "https://twitter.com/featuresliced", isExternal: true }
      ]
    }
  ];

  // 소셜 미디어 링크
  const socialLinks = [
    {
      platform: "GitHub",
      href: "https://github.com/ncaco97/fsd_example",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    },
    {
      platform: "Documentation",
      href: "https://feature-sliced.design",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5v10H6V3h7z" />
        </svg>
      )
    }
  ];

  // 푸터 로고
  const footerLogo = (
    <div className="flex items-center">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-primary flex items-center justify-center text-white">
        <span className="font-bold text-xs">FSD</span>
      </div>
      <span className="ml-3 text-lg font-semibold">Feature-Sliced Design</span>
    </div>
  );

  // 헤더 메뉴 아이템
  const headerMenuItems = [
    { label: "기능", href: "/feature" },
    { label: "예제", href: "/hero" },
    { label: "가격", href: "/pricing" },
    { label: "테스터", href: "/testimonial" }
  ];



  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection 
        logoText="Feature-Sliced Design" 
        menuItems={headerMenuItems}
        ctaText="시작하기"
        ctaLink="/a"
      />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      
      <FooterSection 
        logo={footerLogo}
        columns={footerColumns}
        socialLinks={socialLinks}
        bgColor="dark"
      />
    </div>
  );
}; 