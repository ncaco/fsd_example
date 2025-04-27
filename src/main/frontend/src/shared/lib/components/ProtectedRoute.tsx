import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
  }

  if (!isAuthenticated) {
    // 로그인 페이지로 리다이렉트하면서 이전 위치 저장
    return <Navigate to="/a/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 