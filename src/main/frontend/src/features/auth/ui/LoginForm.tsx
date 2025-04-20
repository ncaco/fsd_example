import React, { useState } from 'react';

export interface LoginFormProps {
  onSubmit?: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(username, password);
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center text-primary mb-6">로그인</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 font-medium">사용자명</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 font-medium">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full py-3 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        로그인
      </button>
    </form>
  );
}; 