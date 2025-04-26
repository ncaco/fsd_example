import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { LoginLeft, LoginForm } from './components';
import { authApi } from '@/features/auth/api/a_auth';
import axios, { AxiosError } from 'axios';

type AlertStatus = {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

const ALoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertStatus>({ show: false, type: 'success', message: '' });
  //const navigate = useNavigate();

  const handleLogin = async (eml: string, pswd: string) => {
    if (!eml || !pswd) {
      setAlert({
        show: true,
        type: 'error',
        message: '이메일과 비밀번호를 모두 입력해주세요.'
      });
      return;
    }
    
    setIsLoading(true);
    setAlert({ show: false, type: 'success', message: '' });
    
    try {
      const response = await authApi.a_login({ eml: eml, pswd: pswd });
      
      // 로그인 성공
      setAlert({ show: true, type: 'success', message: '로그인 성공! 메인 페이지로 이동합니다.' });
      
      localStorage.setItem('sn', response.sn.toString());
      localStorage.setItem('nm', response.nm);
      localStorage.setItem('eml', response.eml);

      // 1초 후 메인 페이지로 리다이렉션
      /*setTimeout(() => {
        navigate('/a');
      }, 1000);
      */
    } catch (error) {
      // 로그인 실패
      const errorMessage = axios.isAxiosError(error)
        ? (error as AxiosError<{ message: string }>).response?.data?.message
        : '서버와 통신 중 오류가 발생했습니다.';
        
      setAlert({ 
        show: true, 
        type: 'error', 
        message: errorMessage || '아이디 또는 비밀번호가 올바르지 않습니다.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* 왼쪽 배경 섹션 */}
      <LoginLeft />

      {/* 오른쪽 로그인 섹션 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-fade-in">
        <LoginForm 
          onLogin={handleLogin}
          isLoading={isLoading}
          alert={alert}
        />
      </div>
    </div>
  );
};

export default ALoginPage;