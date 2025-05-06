import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * 관리자 페이지 컨텐츠를 감싸는 컨테이너 컴포넌트
 * 기본 패딩 및 스타일을 제공합니다.
 */
const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer; 