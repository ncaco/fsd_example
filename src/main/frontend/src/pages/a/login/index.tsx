import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginLeft, LoginForm } from './components';
import { login, resetError } from '@/features/auth/authSlice';
import { A_CustomToast } from '@/shared/ui/toaster';
import { RootState, AppDispatch } from '@/app/store';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const ALoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux 상태에서 필요한 정보 가져오기
  const { isLoading, isAuthenticated, error, user } = useSelector((state: RootState) => state.auth);
  
  // 이전 위치 가져오기
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/a';

  // 컴포넌트 언마운트 시 에러 상태 초기화
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  // 이미 인증된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  // 에러 발생 시 토스트 메시지 표시
  useEffect(() => {
    if (error) {
      A_CustomToast.error(error);
    }
  }, [error]);

  const handleLogin = useCallback(async (eml: string, pswd: string) => {
    if (!eml || !pswd) {
      A_CustomToast.error('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      const resultAction = await dispatch(login({ eml, pswd })).unwrap();
      
      // 로그인 성공
      A_CustomToast.success(`로그인 성공! ${resultAction.nm} 님 환영합니다.`);
      // 리다이렉트는 useEffect에서 처리
    } catch (error) {
      // 에러 처리는 Redux 상태와 useEffect에서 처리됨
      console.error('로그인 실패:', error);
    }
  }, [dispatch]);

  return (
    <>
      <div className="h-screen w-screen flex overflow-hidden">
        {/* 왼쪽 배경 섹션 */}
        <LoginLeft />

        {/* 오른쪽 로그인 섹션 */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-fade-in">
          <LoginForm 
            onLogin={handleLogin}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default ALoginPage;