import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  logoText: string;
  menuItems: {
    label: string;
    href: string;
  }[];
  ctaText: string;
  ctaLink: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  logoText,
  menuItems,
  ctaText,
  ctaLink
}) => {
  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-primary flex items-center justify-center text-white shadow-sm">
                <span className="font-bold text-xs">FSD</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">{logoText}</span>
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              {menuItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <Link 
              to={ctaLink} 
              className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-blue-600 transition-all"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}; 