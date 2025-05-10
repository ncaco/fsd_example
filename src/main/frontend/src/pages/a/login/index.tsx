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
  const [errorHandled, setErrorHandled] = useState(false);
  
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
        
        let validUser = user;
        
        if (!user || user.token === null) {
          // 사용자 정보가 없는 경우 세션 정보를 한 번 더 확인
          try {
            console.log('세션 정보를 다시 확인 중...');
            const sessionInfo = await dispatch(getSessionInfo()).unwrap();
            validUser = sessionInfo;
          } catch (error) {
            console.error('세션 정보 확인 실패:', error);
            setRedirectInProcess(false);
            return; // 세션 정보 확인 실패 시 리다이렉트하지 않음
          }
        }
        
        // 유효한 사용자 정보가 있는 경우에만 리다이렉트
        if (validUser && validUser.token) {
          console.log(`${from} 페이지로 리다이렉트합니다.`);
          navigate(from, { replace: true });
        } else {
          console.error('유효한 사용자 정보가 없어 리다이렉트를 취소합니다.');
          setRedirectInProcess(false);
          // 사용자에게 오류 메시지는 표시하지 않음 (중복 방지)
          // 이 오류는 이미 다른 곳에서 처리됨
        }
      }
    };

    redirectIfAuthenticated();
  }, [isAuthenticated, user, navigate, from, dispatch, redirectInProcess]);

  // 에러 발생 시 토스트 메시지 표시 (handleLogin에서 처리되지 않은 경우만)
  useEffect(() => {
    if (error && !errorHandled) {
      CustomToast.error(error);
      setErrorHandled(true);
      
      // 에러 메시지 표시 후 상태 초기화를 위한 타이머 설정
      const timer = setTimeout(() => {
        setErrorHandled(false);
        dispatch(resetError());
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [error, errorHandled, dispatch]);

  const handleLogin = useCallback(async (eml: string, pswd: string) => {
    if (!eml || !pswd) {
      CustomToast.error('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // 직전 에러 상태 초기화
    dispatch(resetError());
    setErrorHandled(false);
    
    try {
      const resultAction = await dispatch(login({ eml, pswd })).unwrap();
      
      if (!resultAction || resultAction.token === null) {
        // 여기서는 토스트를 직접 표시하지 않고, Redux 상태의 에러를 통해 처리
        // 오류는 auth 상태에 저장되어 useEffect에서 처리됨
        return;
      }

      // 로그인 성공
      CustomToast.success(`로그인 성공! ${resultAction.nm} 님 환영합니다.`);
      // 리다이렉트는 useEffect에서 처리
    } catch (error) {
      // 에러 처리는 Redux 상태와 useEffect에서 처리됨
      console.error('로그인 실패:', error);
      // 여기서 토스트 표시 안함
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