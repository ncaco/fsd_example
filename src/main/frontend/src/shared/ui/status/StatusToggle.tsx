import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import ReactDOM from 'react-dom';

interface StatusToggleProps<T> {
  item: T;
  // 상태 필드 (기본값: yn)
  statusField?: keyof T;
  // 라벨 (기본값: 활성화/비활성화)
  activeLabel?: string;
  inactiveLabel?: string;
  // 상태 변경 콜백 (클릭 시 호출)
  onToggle?: (item: T, newStatus: boolean) => void;
  // 클릭 가능 여부
  clickable?: boolean;
  // 크기 (small/medium/large)
  size?: 'sm' | 'md' | 'lg';
  // 아이콘 모드 (텍스트 대신 아이콘 표시)
  iconMode?: boolean;
  // 툴팁 옵션
  tooltip?: string;
  // 툴팁 위치
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  // 고정 너비 (기본값: 자동)
  width?: number;
}

interface TooltipStyleProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  transform?: string;
}

/**
 * 상태 표시 토글 스위치 컴포넌트
 * 아이템의 yn 필드 값에 따라 상태를 표시하고 클릭 시 상태를 변경할 수 있습니다.
 */
function StatusToggle<T>({
  item,
  statusField = 'yn' as unknown as keyof T,
  activeLabel = '활성화',
  inactiveLabel = '비활성화',
  onToggle,
  clickable = false,
  size = 'md',
  iconMode = false,
  tooltip,
  tooltipPosition = 'top',
  width
}: StatusToggleProps<T>): React.ReactElement {
  // 활성화 여부 확인
  const isActive = isYn(item[statusField]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyleProps>({});
  
  // 스위치 크기 클래스
  const sizeClasses = {
    sm: {
      container: 'h-6',
      circle: 'w-3 h-3',
      text: 'text-xs',
      icon: 'text-[9px]',
      defaultWidth: 64, // 기본 너비 (px)
      circleOffsetActive: 'right-1.5',
      circleOffsetInactive: 'left-1.5',
    },
    md: {
      container: 'h-7',
      circle: 'w-4 h-4',
      text: 'text-sm',
      icon: 'text-[10px]',
      defaultWidth: 76, // 기본 너비 (px)
      circleOffsetActive: 'right-1.5',
      circleOffsetInactive: 'left-1.5',
    },
    lg: {
      container: 'h-8',
      circle: 'w-5 h-5',
      text: 'text-sm',
      icon: 'text-xs font-bold',
      defaultWidth: 88, // 기본 너비 (px)
      circleOffsetActive: 'right-1.5',
      circleOffsetInactive: 'left-1.5',
    }
  };

  // 버튼 너비 계산
  const buttonWidth = width || sizeClasses[size].defaultWidth;
  
  // 툴팁 위치 계산
  useEffect(() => {
    if (showTooltip && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      let style: TooltipStyleProps = {};
      
      switch (tooltipPosition) {
        case 'top':
          style = {
            bottom: window.innerHeight - buttonRect.top + 10,
            left: buttonRect.left + buttonRect.width / 2,
            transform: 'translateX(-50%)'
          };
          break;
        case 'bottom':
          style = {
            top: buttonRect.bottom + 10,
            left: buttonRect.left + buttonRect.width / 2,
            transform: 'translateX(-50%)'
          };
          break;
        case 'left':
          style = {
            top: buttonRect.top + buttonRect.height / 2,
            right: window.innerWidth - buttonRect.left + 10,
            transform: 'translateY(-50%)'
          };
          break;
        case 'right':
          style = {
            top: buttonRect.top + buttonRect.height / 2,
            left: buttonRect.right + 10,
            transform: 'translateY(-50%)'
          };
          break;
      }
      
      setTooltipStyle(style);
    }
  }, [showTooltip, tooltipPosition]);
  
  // 툴팁 화살표 스타일
  const getTooltipArrowStyle = () => {
    let arrowClass = '';
    
    switch (tooltipPosition) {
      case 'top':
        arrowClass = 'after:content-[""] after:absolute after:left-1/2 after:top-full after:transform after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-primary-500';
        break;
      case 'bottom':
        arrowClass = 'after:content-[""] after:absolute after:left-1/2 after:bottom-full after:transform after:-translate-x-1/2 after:border-8 after:border-transparent after:border-b-primary-500';
        break;
      case 'left':
        arrowClass = 'after:content-[""] after:absolute after:top-1/2 after:left-full after:transform after:-translate-y-1/2 after:border-8 after:border-transparent after:border-l-primary-500';
        break;
      case 'right':
        arrowClass = 'after:content-[""] after:absolute after:top-1/2 after:right-full after:transform after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-primary-500';
        break;
    }
    
    return arrowClass;
  };
  
  // 클릭 및 마우스 이벤트 핸들러
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (clickable && onToggle) {
      onToggle(item, !isActive);
    }
  };
  
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // 단순 표시용일 경우 심플한 배지만 표시
  if (!clickable) {
    return (
      <span 
        className={`${isActive ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-0.5 rounded-full ${sizeClasses[size].text}`}
        style={{ width: buttonWidth, display: 'inline-block', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {iconMode ? (isActive ? 'ON' : 'OFF') : (isActive ? activeLabel : inactiveLabel)}
      </span>
    );
  }
  
  // 클릭 가능한 스위치 버튼 표시 (ON/OFF 아이콘 내장)
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-flex items-center justify-center
        ${sizeClasses[size].container}
        border-0 rounded-full cursor-pointer
        transition-colors ease-in-out duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500
        ${isActive 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }
      `}
      style={{ width: buttonWidth }}
      aria-pressed={isActive}
      aria-label={`${isActive ? activeLabel : inactiveLabel} 상태 전환`}
      title={tooltip || (isActive ? `${inactiveLabel}(으)로 전환` : `${activeLabel}(으)로 전환`)}
    >
      <span 
        className={`
          ${iconMode ? sizeClasses[size].icon : sizeClasses[size].text}
          font-medium z-10 truncate
          absolute
        `}
        style={{ 
          maxWidth: buttonWidth - 20, 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          ...(isActive 
            ? { left: '8px', textAlign: 'left' }
            : { right: '8px', textAlign: 'right' }
          )
        }}
      >
        {iconMode 
          ? (isActive ? 'ON' : 'OFF') 
          : (isActive ? activeLabel : inactiveLabel)
        }
      </span>
      <span
        className={`
          absolute
          ${isActive ? sizeClasses[size].circleOffsetActive : sizeClasses[size].circleOffsetInactive}
          flex items-center justify-center
          ${sizeClasses[size].circle}
          rounded-full bg-white shadow-sm
          transition-transform duration-200
        `}
      />
      
      {tooltip && showTooltip && ReactDOM.createPortal(
        <div 
          className={`
            fixed z-50 px-3 py-2 
            text-xs font-medium 
            text-white bg-primary-500 
            rounded-lg shadow-lg 
            whitespace-nowrap pointer-events-none
            max-w-xs
            break-words
            border border-primary-600
            animate-fadeIn
            ${getTooltipArrowStyle()}
          `}
          role="tooltip"
          style={tooltipStyle as CSSProperties}
        >
          {tooltip}
        </div>,
        document.body
      )}
    </button>
  );
}

/**
 * 값이 'Y'인지 확인하는 헬퍼 함수
 */
function isYn(value: unknown): boolean {
  if (typeof value === 'string') {
    return value === 'Y';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return false;
}

export default StatusToggle; 