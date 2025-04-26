import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginLeft, LoginForm } from './components';
import { authApi } from '@/features/auth/api/a_auth';
import axios, { AxiosError } from 'axios';
import { A_CustomToast } from '@/shared/ui/toaster';

const ALoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (eml: string, pswd: string) => {
    if (!eml || !pswd) {
      A_CustomToast.error('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authApi.a_login({ eml: eml, pswd: pswd });
      console.log(response);
      
      if(response.status) {
        // 로그인 성공
        A_CustomToast.success(`로그인 성공! ${response.nm} 님 환영합니다.`);
        
        // 메인 페이지로 리다이렉션
        navigate('/a');
      }else{
        // 로그인 실패
        A_CustomToast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      // 로그인 실패
      const errorMessage = axios.isAxiosError(error)
        ? (error as AxiosError<{ message: string }>).response?.data?.message
        : '서버와 통신 중 오류가 발생했습니다.';
        
      A_CustomToast.error(errorMessage || '아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

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