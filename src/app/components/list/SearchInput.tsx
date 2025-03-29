// src/components/list/SearchInput.tsx
import React, { useState, useEffect } from 'react';
import { ISearchProps } from '../../../types/interfaces/events/IEvents';

import { getInputStyle, getButtonStyle, ButtonVariant } from '../../variants/buttonThemes';

const SearchInput: React.FC<ISearchProps> = ({
  onSearch,
  initialValue = '',
  placeholder = 'חיפוש...',
  variant = 'primary'
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Update local state when initialValue prop changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Debounce search to prevent too many requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex w-full max-w-md rtl"
    >
      <div 
        className={`
          relative flex w-full overflow-hidden transition-all duration-300 rounded-md
          ${isFocused ? `shadow-[0_0_0_4px_rgba(15,23,41,0.08)]` : ''}
        `}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={getInputStyle({
            variant: "default",
            size: "md",
            width: "full",
            className: "rounded-l-none rounded-r-md",
            hasTrailingIcon: true
          })}
        />
        
        {/* Clear button (only visible when there's input) */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="נקה חיפוש"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <button
          type="submit"
          className={`
            ${getButtonStyle(variant as ButtonVariant, "md" as any)}
            rounded-r-none rounded-l-md min-w-[80px]
          `}
        >
          חפש
        </button>
      </div>
    </form>
  );
};

export default SearchInput;