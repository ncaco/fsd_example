import React from 'react';
import { Header } from '../widgets/header';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <h1>FSD 구조 예제</h1>
        <p>Feature-Sliced Design 구조로 구성된 리액트 애플리케이션입니다.</p>
      </main>
    </div>
  );
};

export default App; 