import React from 'react';
import TopButton from '../button/TopButton';

interface PageHeaderProps {
  title: string;
  description?: string;
  buttons?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    icon?: 'plus' | 'edit' | 'delete' | 'search' | 'none';
    size?: 'small' | 'medium' | 'large';
  }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, buttons = [] }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="m-0 text-xl font-medium">{title}</h1>
        {description && <p className="mt-1 mb-0 text-gray-500">{description}</p>}
      </div>
      {buttons.length > 0 && (
        <div className="flex gap-2.5">
          {buttons.map((button, index) => (
            <TopButton 
              key={index}
              onClick={button.onClick}
              label={button.label}
              variant={button.variant || 'primary'}
              icon={button.icon}
              size={button.size || 'medium'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader; 