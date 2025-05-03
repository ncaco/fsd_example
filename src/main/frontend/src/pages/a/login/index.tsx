import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginLeft, LoginForm } from './components';
import { login, resetError, getSessionInfo } from '@/features/auth/authSlice';
import { CustomToast } from '@/shared/ui/toaster';
import { RootState, AppDispatch } from '@/app/store';

//interface LocationState {
//    from?: {
//    pathname: string;
//  };
//}

const ALoginPage: React.FC = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [redirectInProcess, setRedirectInProcess] = useState(false);
  
  // Redux 상태에서 필요한 정보 가져오기
  const { isLoading, isAuthenticated, error, user } = useSelector((state: RootState) => state.auth);
  
  // 이전 위치 가져오기
  //const locationState = location.state as LocationState;
  //const from = locationState?.from?.pathname || '/a';
  const from = '/a';

  // 컴포넌트 언마운트 시 에러 상태 초기화
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  // 인증된 경우 세션 정보를 확인하고 리다이렉트
  useEffect(() => {
    const redirectIfAuthenticated = async () => {
      if (isAuthenticated && !redirectInProcess) {
        setRedirectInProcess(true);
        
        if (!user) {
          // 사용자 정보가 없는 경우 세션 정보를 한 번 더 확인
          try {
            console.log('세션 정보를 다시 확인 중...');
            await dispatch(getSessionInfo()).unwrap();
          } catch (error) {
            console.error('세션 정보 확인 실패:', error);
          }
        }
        
        // 리다이렉트 (세션 정보 확인 성공 여부와 무관하게)
        console.log(`${from} 페이지로 리다이렉트합니다.`);
        navigate(from, { replace: true });
      }
    };

    redirectIfAuthenticated();
  }, [isAuthenticated, user, navigate, from, dispatch, redirectInProcess]);

  // 에러 발생 시 토스트 메시지 표시
  useEffect(() => {
    if (error) {
      CustomToast.error(error);
    }
  }, [error]);

  const handleLogin = useCallback(async (eml: string, pswd: string) => {
    if (!eml || !pswd) {
      CustomToast.error('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      const resultAction = await dispatch(login({ eml, pswd })).unwrap();
      
      // 로그인 성공
      CustomToast.success(`로그인 성공! ${resultAction.nm} 님 환영합니다.`);
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
            isLoading={isLoading || redirectInProcess}
          />
        </div>
      </div>
    </>
  );
};

export default ALoginPage;