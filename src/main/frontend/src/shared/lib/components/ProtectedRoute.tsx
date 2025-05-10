import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { forceLogout } from '@/features/auth/authSlice';

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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 세션 스토리지 확인 (추가 안전장치)
  const token = sessionStorage.getItem('token');
  const userStr = sessionStorage.getItem('user');
  
  const hasSessionStorageToken = !!token;
  const hasSessionStorageUser = !!userStr;
  
  // 세션 스토리지에서 가져온 사용자 객체 확인
  let sessionUser = null;
  if (userStr) {
    try {
      sessionUser = JSON.parse(userStr);
    } catch (e) {
      console.error('세션 사용자 정보 파싱 실패', e);
    }
  }

  // 세션에 저장된 토큰이 실제로 유효한지 확인 (빈 문자열이 아닌지)
  const hasValidToken = hasSessionStorageToken && token !== '';
  
  // 세션에 저장된 사용자 정보가 유효한지 확인
  const hasValidUser = hasSessionStorageUser && 
                      sessionUser && 
                      sessionUser.token && 
                      sessionUser.sn;

  // 진짜 인증되었는지 최종 확인 (Redux 상태와 세션 스토리지 모두 체크)
  const isReallyAuthenticated = isAuthenticated && 
                              !!user && 
                              hasValidToken && 
                              hasValidUser;

  // 인증 상태가 불일치할 경우 처리
  useEffect(() => {
    if (isAuthenticated && (!hasValidToken || !hasValidUser)) {
      console.warn('인증 상태 불일치: Redux는 인증됨, 세션 스토리지는 인증되지 않음');
      // Redux 상태 초기화
      dispatch(forceLogout());
      navigate('/a/login', { replace: true });
    }
  }, [isAuthenticated, hasValidToken, hasValidUser, dispatch, navigate]);

  // 디버깅용 로그 (필요시 주석 해제)
  // console.log('인증 상태 체크:', { 
  //   reduxAuthenticated: isAuthenticated, 
  //   reduxUser: !!user,
  //   sessionToken: hasValidToken,
  //   sessionUser: hasValidUser,
  //   finalResult: isReallyAuthenticated
  // });

  if (!isReallyAuthenticated) {
    // 인증이 되지 않은 경우 로그인 페이지로 리다이렉트하면서 이전 위치 정보를 전달
    console.warn('미인증 접근 시도:', location.pathname);
    return <Navigate to="/a/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 