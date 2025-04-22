import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  title: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterSectionProps {
  logo?: React.ReactNode;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  bgColor?: 'white' | 'gray' | 'dark';
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  logo,
  columns = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} FSD 예제. 모든 권리 보유.`,
  bgColor = 'gray'
}) => {
  // 배경색에 따른 클래스
  const bgClasses = {
    'white': 'bg-white',
    'gray': 'bg-gray-100',
    'dark': 'bg-gray-900 text-white'
  };

  const textClass = bgColor === 'dark' ? 'text-white' : 'text-gray-800';
  const linkClass = bgColor === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900';
  const borderClass = bgColor === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <footer className={`pt-12 pb-8 ${bgClasses[bgColor]}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* 로고 및 소개 */}
          <div className="lg:col-span-2">
            {logo && <div className="mb-4">{logo}</div>}
            <p className={`mb-4 ${bgColor === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
          {columns.map((column, columnIndex) => (
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
          <p className={`text-sm ${bgColor === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}; 