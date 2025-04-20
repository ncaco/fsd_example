import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">로고</div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/a">A 섹션</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}; 