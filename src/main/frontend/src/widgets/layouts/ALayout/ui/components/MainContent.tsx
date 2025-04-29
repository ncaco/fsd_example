import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserInfoDisplay } from './UserInfoDisplay';

export const MainContent: React.FC = () => {
  console.log('-----MainContent Rendered-----');
  
  return (
    <>
      <div className="bg-white shadow-sm rounded-lg mb-8">
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700">
          <h2 className="text-xl font-bold text-white">Feature-Sliced Design</h2>
          <p className="mt-1 max-w-2xl text-sm text-red-100">프론트엔드 아키텍처의 새로운 패러다임</p>
        </div>

        <UserInfoDisplay />

        <div className="px-6 py-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}; 