import React from 'react';
import { Outlet } from 'react-router-dom';
import './ALayout.css';

export const ALayout: React.FC = () => {
  return (
    <div className="a-layout">
      <aside className="a-layout__sidebar">
        <div className="sidebar-content">
          <h2>A 레이아웃</h2>
          <nav>
            <ul>
              <li><a href="/a">A 홈</a></li>
              <li><a href="/a/sub1">서브1</a></li>
              <li><a href="/a/sub2">서브2</a></li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="a-layout__content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}; 