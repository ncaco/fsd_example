import React from 'react';
import { User } from '@entities/user/model/types';

interface UserCardProps {
  user: User;
  onClick?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const handleClick = () => {
    onClick?.(user.id);
  };

  const getRoleBgColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-amber-500';
      case 'user': return 'bg-primary';
      case 'guest': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="flex p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
      onClick={handleClick}
    >
      {user.avatar && (
        <div className="mr-4">
          <img 
            src={user.avatar} 
            alt={`${user.name}의 아바타`} 
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-1">{user.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{user.email}</p>
        <span className={`inline-block px-2 py-1 text-xs rounded text-white capitalize ${getRoleBgColor(user.role)}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default UserCard; 