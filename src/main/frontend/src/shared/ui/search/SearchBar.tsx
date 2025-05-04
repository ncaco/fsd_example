import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onChange, 
  placeholder = "검색어를 입력하세요"
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '8px 8px 8px 32px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
        <span style={{ 
          position: 'absolute', 
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          🔍
        </span>
      </div>
    </div>
  );
};

export default SearchBar; 