import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { sessionState, authState } from '@/shared/api/atom';
import { fetchSessionInfo, checkLoginStatus } from '@/shared/api/session';

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const setSessionState = useSetRecoilState(sessionState);
  const setAuthState = useSetRecoilState(authState);

  // 컴포넌트 마운트 시 세션 정보 가져오기
  useEffect(() => {
    const loadSessionInfo = async () => {
      try {
        // 로그인 상태 확인
        const loginStatus = await checkLoginStatus();
        
        if (loginStatus?.isLoggedIn) {
          // 세션 정보 가져오기
          const sessionInfo = await fetchSessionInfo();
          console.log('서버에서 가져온 세션 정보:', sessionInfo);
          
          if (sessionInfo) {
            // Recoil 상태 업데이트
            setSessionState({
              A_SN: sessionInfo.a_sn || null,
              A_NM: sessionInfo.a_nm || null,
              A_EML: sessionInfo.a_eml || null
            });
            
            // 관리자 권한 설정
            setAuthState({
              admin: sessionInfo.a_eml === 'ADMIN'
            });
          }
        } else {
          console.log('로그인되지 않음');
          // 로그인되지 않은 경우 세션 상태 초기화
          setSessionState({
            A_SN: null,
            A_NM: null,
            A_EML: null
          });
          setAuthState({
            admin: false
          });
        }
      } catch (error) {
        console.error('세션 정보 로드 중 오류 발생:', error);
      }
    };

    loadSessionInfo();
    
    // 5분마다 세션 정보 갱신
    const intervalId = setInterval(loadSessionInfo, 5 * 60 * 1000);
    
    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(intervalId);
  }, [setSessionState, setAuthState]);

  return <>{children}</>;
}; 