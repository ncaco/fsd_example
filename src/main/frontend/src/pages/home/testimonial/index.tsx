import React from 'react';

// 테스트 데이터
const TESTIMONIALS = [
  {
    quote: "Feature-Sliced Design은 확장 가능한 아키텍처를 구축하는 데 매우 효과적이었습니다. 팀 간 협업이 원활해졌고 코드 품질이 크게 향상되었습니다.",
    author: "김민재",
    role: "시니어 프론트엔드 개발자",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote: "이 아키텍처를 도입한 후 코드 재사용성이 높아지고 유지보수가 훨씬 쉬워졌습니다. 신규 개발자의 온보딩 시간도 크게 단축되었습니다.",
    author: "이지은",
    role: "개발팀 리드",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    quote: "복잡한 SPA 프로젝트에서 FSD는 확장성과 구조화된 개발 방식을 제공했습니다. 모듈화된 접근 방식 덕분에 팀 생산성이 향상되었습니다.",
    author: "박성훈",
    role: "풀스택 개발자",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

const title = "개발자들의 실제 경험";
const description = "Feature-Sliced Design을 사용하는 개발자들의 이야기를 들어보세요";
const testimonials = TESTIMONIALS;
const bgColor = 'white'

const bgClasses = {
  'white': 'bg-white',
  'gray': 'bg-gray-50',
  'primary-light': 'bg-primary-50'
};
export const TestimonialSection: React.FC = () => {
  return (
    <section className={`py-16 sm:py-24 ${bgClasses[bgColor]}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-xl text-gray-500">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 
export default TestimonialSection;