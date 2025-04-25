import React from 'react';

interface DemoAccountInfoProps {
  username: string;
  password: string;
}

const DemoAccountInfo: React.FC<DemoAccountInfoProps> = ({ username, password }) => {
  return (
    <div className="mt-8 text-center text-xs text-gray-500">
      <div className="p-3 bg-red-50 rounded-md text-left shadow-sm">
        <p className="font-medium text-red-700 mb-1">데모 계정 정보:</p>
        <p className="text-red-600">아이디: {username} / 비밀번호: {password}</p>
      </div>
    </div>
  );
};

export default DemoAccountInfo; 