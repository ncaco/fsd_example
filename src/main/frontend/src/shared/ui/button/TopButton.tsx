import React, { useState } from 'react';

interface TopButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: 'plus' | 'edit' | 'delete' | 'search' | 'none';
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

  // 버튼 색상 클래스 설정
  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  // 버튼 크기 클래스 설정
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-xs';
      case 'large':
        return 'px-5 py-2.5 text-base';
      default: // medium
        return 'px-4 py-2 text-sm';
    }
  };

  // 아이콘 가져오기
  const getIcon = () => {
    switch (icon) {
      case 'plus':
        return '+';
      case 'edit':
        return '✎';
      case 'delete':
        return '×';
      case 'search':
        return '🔍';
      case 'none':
        return null;
      default:
        return '+';
    }
  };

  const iconSize = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
  const buttonIcon = getIcon();
  
  const shadowClass = isHovered ? 'shadow-md' : 'shadow';

  return (
    <button 
      onClick={onClick}
      className={`
        ${getButtonColors()}
        ${getButtonSize()}
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
      {buttonIcon && (
        <span className={`${iconSize} flex items-center justify-center`}>
          {buttonIcon}
        </span>
      )}
      {label}
    </button>
  );
};

export default TopButton; 