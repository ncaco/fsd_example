import React from 'react';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  popular?: boolean;
}

interface PricingSectionProps {
  title: string;
  description: string;
  plans: PricingPlan[];
}

// 가격표 데이터
const pricingPlans = [
  {
    title: "무료",
    price: "무료",
    description: "소규모 프로젝트와 개인 개발자를 위한 기본 플랜",
    features: [
      { name: "기본 FSD 구조 템플릿", included: true },
      { name: "공식 문서 접근", included: true },
      { name: "커뮤니티 지원", included: true },
      { name: "코드 생성 도구", included: false },
      { name: "고급 구성 요소", included: false },
      { name: "우선 지원", included: false },
    ],
    ctaText: "시작하기",
  },
  {
    title: "팀",
    price: "₩49,000",
    description: "성장하는 팀과 중규모 프로젝트를 위한 플랜",
    features: [
      { name: "기본 FSD 구조 템플릿", included: true },
      { name: "공식 문서 접근", included: true },
      { name: "커뮤니티 지원", included: true },
      { name: "코드 생성 도구", included: true },
      { name: "고급 구성 요소", included: true },
      { name: "우선 지원", included: false },
    ],
    ctaText: "무료 체험 시작",
    popular: true,
  },
  {
    title: "기업",
    price: "₩129,000",
    description: "대규모 프로젝트와 전문 팀을 위한 고급 플랜",
    features: [
      { name: "기본 FSD 구조 템플릿", included: true },
      { name: "공식 문서 접근", included: true },
      { name: "커뮤니티 지원", included: true },
      { name: "코드 생성 도구", included: true },
      { name: "고급 구성 요소", included: true },
      { name: "우선 지원", included: true },
    ],
    ctaText: "문의하기",
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  title = "가격 표",
  description = "Feature-Sliced Design을 사용하는 개발자들의 이야기를 들어보세요",
  plans = pricingPlans,
}) => {
  return (
    <div className="bg-white py-16 px-6 sm:py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          {description}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 ${
              plan.popular ? 'bg-indigo-50 ring-indigo-300 lg:scale-105' : 'bg-white'
            }`}
          >
            {plan.popular && (
              <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 mb-5">
                인기 선택
              </p>
            )}
            <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
            <p className="mt-4 text-sm text-gray-600">{plan.description}</p>
            <p className="mt-6">
              <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
              {plan.price !== '무료' && <span className="text-base text-gray-500">/월</span>}
            </p>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  {feature.included ? (
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-indigo-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="ml-3 text-sm text-gray-600">
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 block w-full rounded-md py-3 px-4 text-center text-sm font-semibold ${
                plan.popular
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white text-indigo-600 hover:bg-gray-50 ring-1 ring-inset ring-indigo-200'
              }`}
            >
              {plan.ctaText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 