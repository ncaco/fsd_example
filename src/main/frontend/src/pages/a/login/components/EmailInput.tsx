import React, { useState } from 'react';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, onKeyDown }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <div className={`flex items-center border-b ${isFocused ? 'border-red-500' : 'border-gray-300'} transition-colors`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={onKeyDown}
          className="block w-full py-2 px-0 bg-transparent text-gray-900 focus:outline-none placeholder-gray-500"
          placeholder="이메일"
        />
      </div>
      {email && (
        <button 
          type="button" 
          onClick={() => setEmail('')}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EmailInput; 