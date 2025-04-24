import React from 'react';
import { Link } from 'react-router-dom';

// 푸터 링크 정의
const footerColumns = [
  {
    title: "문서",
    links: [
      { title: "시작하기", href: "/guide", isExternal: false },
      { title: "아키텍처 설명", href: "/guide/architecture", isExternal: false },
      { title: "모범 사례", href: "/guide/best-practices", isExternal: false }
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

const copyright = `© ${new Date().getFullYear()} FSD 예제. 모든 권리 보유.`;

export const FooterSection: React.FC = () => {
  // 배경색에 따른 클래스
  const bgClasses = {
    'white': 'bg-white',
    'gray': 'bg-gray-100',
    'dark': 'bg-gray-900 text-white'
  };

  const textClass = 'text-gray-800';
  const linkClass = 'text-gray-600 hover:text-gray-900';
  const borderClass = 'border-gray-200';

  return (
    <footer className={`pt-12 pb-8 ${bgClasses['dark']}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* 로고 및 소개 */}
          <div className="lg:col-span-2">
            {footerLogo && <div className="mb-4">{footerLogo}</div>}
            <p className={`mb-4 ${textClass}`}>
              Feature-Sliced Design 아키텍처를 적용한 실무 애플리케이션 제작 예제입니다.
              효율적인 코드 구성과 유지보수를 위한 최적의 솔루션을 제공합니다.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} transition-colors`}
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 링크 컬럼 */}
          {footerColumns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className={`text-lg font-medium mb-4 ${textClass}`}>{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.isExternal ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkClass} transition-colors`}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link to={link.href} className={`${linkClass} transition-colors`}>
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 저작권 */}
        <div className={`pt-8 mt-8 border-t ${borderClass}`}>
          <p className={`text-sm ${textClass} text-center`}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}; 