import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증된 사용자만 접근할 수 있는 보호된 라우트 컴포넌트
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉트됩니다.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // 로컬 스토리지 확인 (추가 안전장치)
  const hasLocalStorageToken = !!localStorage.getItem('token');
  const hasLocalStorageUser = !!localStorage.getItem('user');
  
  // 진짜 인증되었는지 최종 확인 (Redux 상태와 로컬 스토리지 모두 체크)
  const isReallyAuthenticated = isAuthenticated && !!user && hasLocalStorageToken && hasLocalStorageUser;

  console.log('인증 상태 체크:', { 
    reduxAuthenticated: isAuthenticated, 
    reduxUser: !!user,
    localToken: hasLocalStorageToken,
    localUser: hasLocalStorageUser,
    finalResult: isReallyAuthenticated
  });

  if (!isReallyAuthenticated) {
    // 인증이 되지 않은 경우 로그인 페이지로 리다이렉트하면서 이전 위치 정보를 전달
    return <Navigate to="/a/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 