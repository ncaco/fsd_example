import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginLeft, LoginForm } from './components';

type AlertStatus = {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

const ALoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertStatus>({ show: false, type: 'success', message: '' });
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    if (!email || !password) {
      setAlert({
        show: true,
        type: 'error',
        message: '이메일과 비밀번호를 모두 입력해주세요.'
      });
      return;
    }
    
    setIsLoading(true);
    setAlert({ show: false, type: 'success', message: '' });
    
    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      
      // 로그인 성공 케이스 (데모용)
      if (email === 'admin' && password === 'password') {
        setAlert({ show: true, type: 'success', message: '로그인 성공! 메인 페이지로 이동합니다.' });
        
        // 1초 후 메인 페이지로 리다이렉션
        setTimeout(() => {
          navigate('/a');
        }, 1000);
      } else {
        // 로그인 실패 케이스
        setAlert({ show: true, type: 'error', message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
    }, 1500);
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