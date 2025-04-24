import React from 'react';
import { Link } from 'react-router-dom';

// 히어로 섹션 데이터
const heroProps = {
  title: "더 나은 아키텍처, 더 나은 개발 경험",
  subtitle: "Feature-Sliced Design은 프론트엔드 프로젝트를 더 체계적이고 유지보수하기 쉽게 구성할 수 있는 아키텍처 방법론입니다.",
  primaryCTA: {
    text: "가이드 보기",
    href: "/a"
  },
  secondaryCTA: {
    text: "GitHub 방문하기",
    href: "#"
  },
  image: ""
};

const title = heroProps.title;
const subtitle = heroProps.subtitle;
const primaryCTA = heroProps.primaryCTA;
const secondaryCTA = heroProps.secondaryCTA;
const image = heroProps.image;

export const HeroSection: React.FC = () => {

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-bold text-gray-800 sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to={primaryCTA.href}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  {primaryCTA.text}
                </Link>
              </div>
              {secondaryCTA && (
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to={secondaryCTA.href}
                    className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    {secondaryCTA.text}
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:flex lg:items-center">
            {image ? (
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                src={image}
                alt="Feature Sliced Design illustration"
              />
            ) : (
              <div className="w-full h-72 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl shadow-xl flex items-center justify-center">
                <div className="px-4 text-center text-white">
                  <div className="text-4xl font-bold">FSD</div>
                  <div className="mt-2 text-lg">Feature Sliced Design</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 
export default HeroSection;