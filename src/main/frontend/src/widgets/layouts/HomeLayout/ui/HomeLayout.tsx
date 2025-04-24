import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderSection } from './components/HeaderSection';
import { FooterSection } from './components/FooterSection';

export const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
}; 