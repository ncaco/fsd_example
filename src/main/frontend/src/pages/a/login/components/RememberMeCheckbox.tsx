import React from 'react';

interface RememberMeCheckboxProps {
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
        아이디 저장
      </label>
    </div>
  );
};

export default RememberMeCheckbox; 