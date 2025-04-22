import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureSectionProps {
  sectionTitle?: string;
  sectionDescription?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}


// 기능 섹션 데이터
const featureProps = {
  sectionTitle: "프론트엔드 개발의 새로운 표준",
  sectionDescription: "Feature-Sliced Design으로 얻을 수 있는 이점",
  features: [
    {
      title: "확장성",
      description: "프로젝트 규모가 커질수록 더 빛나는 구조화된 아키텍처로 개발 및 유지보수 비용을 줄여줍니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "팀 협업",
      description: "개발자 간 책임 영역을 명확히 구분하여 효율적인 협업과 병렬 개발이 가능합니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "유연성",
      description: "다양한 프레임워크와 라이브러리에 적용 가능한 기술에 구애받지 않는 아키텍처 패턴입니다.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ]
};

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  sectionTitle = featureProps.sectionTitle,
  sectionDescription = featureProps.sectionDescription,
  features = featureProps.features,
  columns = 3
}) => {
  // 컬럼 수에 따른 그리드 클래스
  const gridClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-12">
            {sectionTitle && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${gridClass} gap-8`}>
          {features.map((feature, index) => (
            <div key={index} className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              {feature.icon && (
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 