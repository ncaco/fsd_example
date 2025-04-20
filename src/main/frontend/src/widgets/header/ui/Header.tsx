import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">로고</div>
        <nav className="navigation">
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/about">소개</a></li>
            <li><a href="/contact">연락처</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 