import React from 'react';
import { Menu } from '@/entities/menu';

interface StatusLabelProps {
  menu: Menu;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ menu }) => {
  let statusClass = 'bg-red-500'; // 비활성화 상태 기본 클래스
  let label = '비활성화';
  
  if (menu.useYn === 'Y' && menu.expsrYn === 'Y') {
    statusClass = 'bg-green-500'; // 활성화
    label = '활성화';
  } else if (menu.useYn === 'Y') {
    statusClass = 'bg-orange-500'; // 비노출
    label = '비노출';
  }
  
  return (
    <span className={`${statusClass} text-white px-2 py-0.5 rounded-full text-xs`}>
      {label}
    </span>
  );
};

export default StatusLabel; 