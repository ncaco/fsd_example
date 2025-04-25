import React, { useState } from 'react';
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

  const handleLogin = () => {
    if (!email || !password) return;
    
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
          navigate('/a/main');
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-300 to-blue-500 p-12 flex-col justify-center relative">
        <div className="max-w-lg mx-auto">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-2">Digital</h2>
            <h2 className="text-5xl font-bold mb-2">platform</h2>
            <h2 className="text-5xl font-bold mb-2">for distance</h2>
            <h2 className="text-5xl font-bold">learning.</h2>
            
            <div className="mt-12">
              <p className="text-white/90">You will never know everything.</p>
              <p className="text-white/90">But you will know more.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 로그인 섹션 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-block p-2 mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v6h7v2h-9V6h2z" fill="#4F46E5"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Hey, hello 👋</h2>
            <p className="text-gray-500 mt-2">로그인 정보를 입력해주세요.</p>
          </div>

          {alert.show && (
            <div className={`mb-4 p-3 rounded text-sm ${
              alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {alert.message}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    로그인 중...
                  </span>
                ) : 'Login'}
              </button>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <div>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm flex justify-center items-center text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C8.086 2 4.3 5.648 4.3 10.011c0 4.363 3.786 8.011 8.245 8.011 4.458 0 8.244-3.648 8.244-8.011 0-.553-.058-1.093-.167-1.613h-8.077z"
                    fill="#4285F4"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <div className="mt-3 p-2 bg-blue-50 rounded-md text-left">
              <p className="font-medium text-blue-700">데모 계정 정보:</p>
              <p className="text-blue-600">아이디: admin / 비밀번호: password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALoginPage;