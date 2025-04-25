import React from 'react';

interface LoginButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex w-full justify-center rounded-full bg-red-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none transition-colors duration-200 relative overflow-hidden group"
    >
      <span className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out scale-0 rounded-full bg-red-800 group-hover:scale-100 group-hover:opacity-30 ${isLoading ? 'hidden' : ''}`}></span>
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          로딩중...
        </span>
      ) : '로그인'}
    </button>
  );
};

export default LoginButton; 