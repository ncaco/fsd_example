import React, { useState, useEffect } from 'react';
import { LeftMenu } from './components/LeftMenu';
import { MainContent } from './components/MainContent';
import { MobileBottomMenu } from './components/MobileBottomMenu';
import { authApi } from '@/features/auth/api/a_auth'; 
import { User } from '@/types/a/user';

export const ALayout: React.FC = () => {
  console.log('-----ALayout Rendered-----');
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('-----ALayout useEffect-----');
    
    const fetchUser = async () => {
      const response = await authApi.a_sessionInfo();
      setUser(response);

      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
        {/* 왼쪽 메뉴 */}
        <LeftMenu user={user} />
          
        {/* 메인 콘텐츠 - 유동적 너비, 전체 높이, 내부 스크롤 */}
        <div className="flex-1 h-full overflow-hidden">
          <div className="h-full overflow-auto">
            <MainContent user={user} />
          </div>
        </div>

        {/* 반응형에서 하단 메뉴 */}
        <MobileBottomMenu />
      </div>
    </>
  );
}; 