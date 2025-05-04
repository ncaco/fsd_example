import React from 'react';

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
  // 버튼 색상 설정
  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: '#1976d2', color: 'white', hoverBg: '#1565c0' };
      case 'secondary':
        return { bg: '#f5f5f5', color: '#333', hoverBg: '#e0e0e0' };
      case 'success':
        return { bg: '#4caf50', color: 'white', hoverBg: '#43a047' };
      case 'danger':
        return { bg: '#f44336', color: 'white', hoverBg: '#e53935' };
      default:
        return { bg: '#1976d2', color: 'white', hoverBg: '#1565c0' };
    }
  };

  // 버튼 크기 설정
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { padding: '6px 12px', fontSize: '12px' };
      case 'large':
        return { padding: '10px 20px', fontSize: '16px' };
      default: // medium
        return { padding: '8px 16px', fontSize: '14px' };
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

  const { bg, color, hoverBg } = getButtonColors();
  const { padding, fontSize } = getButtonSize();
  const buttonIcon = getIcon();

  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor: bg,
        color: color,
        border: 'none',
        padding: padding,
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        outline: 'none'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = hoverBg;
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = bg;
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      }}
    >
      {buttonIcon && (
        <span style={{ 
          fontSize: size === 'small' ? '14px' : size === 'large' ? '20px' : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {buttonIcon}
        </span>
      )}
      {label}
    </button>
  );
};

export default TopButton; 