import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">제품</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">개요</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">기능</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">가격</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">사례 연구</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">리소스</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">문서</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">가이드</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">API 참조</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">블로그</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">회사</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">소개</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">팀</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">채용</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">연락처</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">뉴스레터</h3>
            <p className="text-base text-gray-500 mb-4">최신 업데이트 및 소식을 받아보세요.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="이메일 주소"
                className="min-w-0 flex-1 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-r-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                구독
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">FSD</span>
            </div>
            <span className="text-base font-bold text-gray-900">Feature Sliced Design</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Feature Sliced Design. 모든 권리 보유.
        </div>
      </div>
    </footer>
  );
}; 