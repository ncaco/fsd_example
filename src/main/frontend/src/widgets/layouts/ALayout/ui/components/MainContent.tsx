import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { authApi } from '@/features/auth/api/a_auth';
import { User } from '@/types/a/user';

export const MainContent: React.FC = () => {
  console.log('-----MainContent Rendered-----');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('-----MainContent useEffect-----');
    
    const fetchUser = async () => {
      const response = await authApi.a_sessionInfo();  
      console.log(response);
      setUser(response);
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg mb-8">
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700">
          <h2 className="text-xl font-bold text-white">Feature-Sliced Design</h2>
          <p className="mt-1 max-w-2xl text-sm text-red-100">프론트엔드 아키텍처의 새로운 패러다임</p>
        </div>

        {/* 현재 사용자 정보 표시 */}
        <div className="px-6 py-5">
          <div className="text-sm text-gray-500">
            <span className="font-bold">이름:</span> {user?.nm}
            <span className="font-bold">이메일:</span> {user?.eml}
          </div>
        </div>

        <div className="px-6 py-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}; 