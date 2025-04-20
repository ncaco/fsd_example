import React from 'react';
import { User } from '../model/types';
import './UserCard.css';

interface UserCardProps {
  user: User;
  onClick?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const handleClick = () => {
    onClick?.(user.id);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      {user.avatar && (
        <div className="user-avatar">
          <img src={user.avatar} alt={`${user.name}의 아바타`} />
        </div>
      )}
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <span className={`user-role ${user.role}`}>{user.role}</span>
      </div>
    </div>
  );
};

export default UserCard; 