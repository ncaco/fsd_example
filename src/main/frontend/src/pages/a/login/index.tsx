import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type AlertStatus = {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

const ALoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertStatus>({ show: false, type: 'success', message: '' });
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFocused, setFormFocused] = useState({
    email: false,
    password: false
  });

  // 로컬 스토리지에서 저장된 이메일 정보 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
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
    
    // 아이디 저장 기능
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* 왼쪽 배경 섹션 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-300 to-red-600 p-12 flex-col justify-center relative">
        <div className="max-w-lg mx-auto">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Feature</h2>
            <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>Sliced</h2>
            <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>Design</h2>
            <h2 className="text-5xl font-bold animate-fade-in-up" style={{animationDelay: '0.4s'}}>a Learning.</h2>
            
            <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <p className="text-white/90">You will never know everything.</p>
              <p className="text-white/90">But you will know more.</p>
            </div>
          </div>
        </div>

        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* 오른쪽 로그인 섹션 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-fade-in">
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

          {alert.show && (
            <div className={`mb-4 p-3 rounded-md text-sm flex items-center ${
              alert.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <span className="mr-2">
                {alert.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {alert.message}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="relative">
              <div className={`flex items-center border-b ${formFocused.email ? 'border-red-500' : 'border-gray-300'} transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFormFocused(prev => ({...prev, email: true}))}
                  onBlur={() => setFormFocused(prev => ({...prev, email: false}))}
                  onKeyDown={handleKeyDown}
                  className="block w-full py-2 px-0 bg-transparent text-gray-900 focus:outline-none placeholder-gray-500"
                  placeholder="이메일"
                />
              </div>
              {email && (
                <button 
                  type="button" 
                  onClick={() => setEmail('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            <div className="relative">
              <div className={`flex items-center border-b ${formFocused.password ? 'border-red-500' : 'border-gray-300'} transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFormFocused(prev => ({...prev, password: true}))}
                  onBlur={() => setFormFocused(prev => ({...prev, password: false}))}
                  onKeyDown={handleKeyDown}
                  className="block w-full py-2 px-0 bg-transparent text-gray-900 focus:outline-none placeholder-gray-500"
                  placeholder="비밀번호"
                />
                <button 
                  type="button" 
                  className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  자동 로그인
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-800 transition-colors">
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="flex w-full justify-center rounded-full bg-red-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none transition-colors duration-200 relative overflow-hidden group"
              >
                <span className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out scale-0 rounded-full bg-red-800 group-hover:scale-100 group-hover:opacity-30 ${isLoading ? 'hidden' : ''}`}></span>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    로딩중...
                  </span>
                ) : '로그인'}
              </button>
            </div>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">다른 방법으로 로그인</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-3">
              {[
                { name: 'Google', icon: 'M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C8.086 2 4.3 5.648 4.3 10.011c0 4.363 3.786 8.011 8.245 8.011 4.458 0 8.244-3.648 8.244-8.011 0-.553-.058-1.093-.167-1.613h-8.077z', color: '#4285F4' },
                { name: 'Facebook', icon: 'M9.95235 3.29509H12.0477V0H9.07139V0.026C5.57736 0.183727 4.4438 2.24509 4.36794 4.46655H4.35791V6.67H2V10.0772H4.35791V20H7.7658V10.0772H11.3894L11.9177 6.67H7.7658V4.80682C7.7658 3.91227 8.67462 3.29509 9.95235 3.29509Z', color: '#1877F2' },
                { name: 'Instagram', icon: 'M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.655.228 2.042.379.514.2.88.437 1.265.822.385.385.622.751.822 1.265.15.387.33.97.379 2.042.053 1.16.064 1.508.064 4.445 0 2.938-.011 3.285-.064 4.445-.049 1.072-.228 1.655-.379 2.042-.2.514-.437.88-.822 1.265-.385.385-.751.622-1.265.822-.387.15-.97.33-2.042.379-1.16.053-1.508.064-4.445.064-2.937 0-3.285-.011-4.445-.064-1.072-.049-1.655-.228-2.042-.379-.514-.2-.88-.437-1.265-.822-.385-.385-.622-.751-.822-1.265-.15-.387-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445 0-2.937.011-3.285.064-4.445.049-1.072.228-1.655.379-2.042.2-.514.437-.88.822-1.265.385-.385.751-.622 1.265-.822.387-.15.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064', color: '#E4405F' },
                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', color: '#1DA1F2' },
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: '#0A66C2' }
              ].map((social) => (
                <button 
                  key={social.name}
                  className="flex justify-center items-center rounded-full border border-gray-300 bg-white p-2 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 hover:scale-105"
                  aria-label={`${social.name}로 로그인`}
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill={social.color}>
                    <path d={social.icon} />
                  </svg>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>아직 계정이 없으신가요? <Link to="/register" className="font-medium text-red-600 hover:text-red-800 transition-colors">회원가입</Link></p>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500">
              <div className="p-3 bg-red-50 rounded-md text-left shadow-sm">
                <p className="font-medium text-red-700 mb-1">데모 계정 정보:</p>
                <p className="text-red-600">아이디: admin / 비밀번호: password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALoginPage;