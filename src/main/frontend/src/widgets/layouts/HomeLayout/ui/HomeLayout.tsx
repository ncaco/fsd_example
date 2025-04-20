import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/ui/Header';
import './HomeLayout.css';

export const HomeLayout: React.FC = () => {
  return (
    <div className="home-layout">
      <Header />
      <main className="home-layout__content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="home-layout__footer">
        <div className="container">
          <p>© 2024 홈 레이아웃</p>
        </div>
      </footer>
    </div>
  );
}; 