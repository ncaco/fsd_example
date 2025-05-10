import React, { useState } from 'react';

interface TopButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: 'plus' | 'edit' | 'delete' | 'search' | 'menu' | 'user' | 'mypage' | 'favorite' | 'home' | 'logout' | 'setting' | 'example' | 'start' | 'dashboard' | 'default' | 'none' | 'list';
  size?: 'small' | 'medium' | 'large';
}

/**
 * 상단에 표시되는 버튼 컴포넌트
 * 다양한 색상 옵션과 아이콘을 지원합니다.
 */
const TopButton: React.FC<TopButtonProps> = ({
  onClick,
  label = "등록",
  variant = "primary",
  icon = "plus",
  size = "medium"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // 버튼 색상 클래스 매핑
  const buttonColors = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    success: 'bg-success-500 hover:bg-success-600 text-white',
    danger: 'bg-danger-500 hover:bg-danger-600 text-white'
  };

  // 버튼 크기 클래스 매핑
  const buttonSizes = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-5 py-2.5 text-base'
  };

  // 아이콘 크기 매핑
  const iconSizes = {
    small: 'w-3.5 h-3.5',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  // SVG 아이콘 경로 가져오기
  const getIconSrc = () => {
    if (icon === 'none') return null;
    
    // primary 버튼에는 흰색 아이콘 사용
    if (variant === 'primary' && icon === 'plus') {
      return '/icons/plus_white.svg';
    }
    
    return `/icons/${icon}.svg`;
  };

  const iconSrc = getIconSrc();
  const shadowClass = isHovered ? 'shadow-md' : 'shadow';

  return (
    <button 
      onClick={onClick}
      className={`
        ${buttonColors[variant]}
        ${buttonSizes[size]}
        ${shadowClass}
        border-none
        rounded
        font-medium
        flex
        items-center
        justify-center
        gap-1.5
        transition-all
        duration-200
        outline-none
      `}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {iconSrc && (
        <img 
          src={iconSrc}
          alt=""
          className={iconSizes[size]}
          aria-hidden="true"
        />
      )}
      {label}
    </button>
  );
};

export default TopButton; 