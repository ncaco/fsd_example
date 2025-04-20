import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/layouts/HomeLayout/header/ui/Header';

export const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-wireframe-bg">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <footer className="bg-wireframe-border py-4 mt-auto border-t border-wireframe-border">
        <div className="container mx-auto px-4 text-wireframe-text">
          <p>© 2024 와이어프레임 레이아웃</p>
        </div>
      </footer>
    </div>
  );
}; 