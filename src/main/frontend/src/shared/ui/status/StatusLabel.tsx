import React from 'react';
import { Menu } from '@/entities/menu';

interface StatusLabelProps {
  menu: Menu;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ menu }) => {
  let backgroundColor = '#f44336'; // 비활성화
  let label = '비활성화';
  
  if (menu.useYn === 'Y' && menu.expsrYn === 'Y') {
    backgroundColor = '#4caf50'; // 활성화
    label = '활성화';
  } else if (menu.useYn === 'Y') {
    backgroundColor = '#ff9800'; // 비노출
    label = '비노출';
  }
  
  return (
    <span style={{ 
      backgroundColor, 
      color: 'white',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '12px',
    }}>
      {label}
    </span>
  );
};

export default StatusLabel; 