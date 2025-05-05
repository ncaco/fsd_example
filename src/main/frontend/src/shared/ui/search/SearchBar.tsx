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
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onChange}
          className="w-full px-8 py-2 rounded border border-gray-300 box-border"
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
          🔍
        </span>
      </div>
    </div>
  );
};

export default SearchBar; 