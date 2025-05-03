import React from 'react';
import { LeftMenu } from './components/LeftMenu';
import { MainContent } from './components/MainContent';
import { Header } from './components/Header';
export const ALayout: React.FC = () => {
  console.log('-----ALayout Rendered-----');

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
        {/* 왼쪽 메뉴 */}
        <LeftMenu />

        
        <div className="flex-1 h-full overflow-hidden">
          <Header />

          <MainContent />
        </div>

      </div>
    </>
  );
}; 