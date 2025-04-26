import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoginButton from './LoginButton';
import AlertMessage from './AlertMessage';
import SocialLoginButtons from './SocialLoginButtons';
import DemoAccountInfo from './DemoAccountInfo';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
  alert: {
    show: boolean;
    type: 'success' | 'error';
    message: string;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, alert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 로컬 스토리지에서 저장된 이메일 정보 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    // 아이디 저장 기능
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    onLogin(email, password);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with: ${provider}`);
    // 소셜 로그인 구현
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-end mb-6">
        <select className="text-sm text-gray-500 border-none bg-transparent hover:text-red-600 focus:outline-none cursor-pointer transition-colors">
          <option>한국어</option>
          <option>English(USA)</option>
        </select>
      </div>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">로그인</h2>
        <p className="text-gray-500 mt-2 text-sm">계정에 로그인하여 서비스를 이용하세요</p>
      </div>

      <AlertMessage show={alert.show} type={alert.type} message={alert.message} />
      
      <div className="space-y-6">
        <EmailInput 
          email={email} 
          setEmail={setEmail} 
          onKeyDown={handleKeyDown} 
        />

        <PasswordInput 
          password={password} 
          setPassword={setPassword} 
          onKeyDown={handleKeyDown} 
        />

        <div className="flex items-center justify-between mt-2">
          <RememberMeCheckbox 
            rememberMe={rememberMe} 
            setRememberMe={setRememberMe} 
          />
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-800 transition-colors">
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <LoginButton 
            onClick={handleLogin} 
            isLoading={isLoading} 
          />
        </div>

        <SocialLoginButtons 
          onSocialLogin={handleSocialLogin} 
        />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>아직 계정이 없으신가요? <Link to="/register" className="font-medium text-red-600 hover:text-red-800 transition-colors">회원가입</Link></p>
        </div>

        <DemoAccountInfo />
      </div>
    </div>
  );
};

export default LoginForm; 