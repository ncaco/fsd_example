import React, { useState, useEffect } from 'react';
import { authApi, User } from '@/features/auth/api/a_auth';


// 데모 계정 정보 표시
const DemoAccountInfo: React.FC = () => {

  const [demoAccount, setDemoAccount] = useState<User | null>(null);

  useEffect(() => {
    const fetchDemoAccount = async () => {
      const response = await authApi.a_demoAccount();
      setDemoAccount(response);
    };
    fetchDemoAccount();
  }, []);

  return (
    <div className="mt-8 text-center text-xs text-gray-500">
      <div className="p-3 bg-red-50 rounded-md text-left shadow-sm">
        <p className="font-medium text-red-700 mb-1">데모 계정 정보:</p>
        <p className="text-red-600">아이디: {demoAccount?.eml} / 비밀번호: {demoAccount?.pswd}</p>
      </div>
    </div>
  );
};

export default DemoAccountInfo; 