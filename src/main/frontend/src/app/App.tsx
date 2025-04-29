import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from '@app/providers';
import { getSessionInfo, forceLogout } from '@/features/auth/authSlice';
import { AppDispatch } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 앱 초기화 시 세션 정보 확인
    const checkSession = async () => {
      try {
        // 로컬 스토리지에 토큰이 없으면 API 호출 없이 바로 로그아웃 처리
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
          console.log('로컬 스토리지에 인증 정보가 없어 로그아웃 처리합니다.');
          dispatch(forceLogout());
          return;
        }
        
        // 토큰이 있으면 세션 유효성 확인
        await dispatch(getSessionInfo()).unwrap();
        console.log('세션 정보 확인 성공');
      } catch (error) {
        console.error('세션 정보 확인 실패:', error);
        // 세션 정보 확인 실패 시 강제 로그아웃
        dispatch(forceLogout());
      }
    };
    
    checkSession();
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <RouterProvider />
    </div>
  );
};

export default App; 