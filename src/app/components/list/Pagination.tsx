// src/components/list/Pagination.tsx
import React from 'react';
import { IPaginationProps } from '../../../types/interfaces/events/IEvents';

import { getPaginationContainerClass } from '../../variants/listTheme';
import { getButtonStyle, ButtonVariant } from '../../variants/buttonThemes';

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default'
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Create an array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className={getPaginationContainerClass(variant)}>
      <div className="flex rtl justify-between w-full">
        {/* Page info */}
        <div className="text-sm text-gray-700">
          עמוד <span className="font-medium">{currentPage}</span> מתוך{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
        
        {/* Page navigation */}
        <div className="flex space-x-reverse space-x-1">
          {/* First page */}
          <button
            className={getButtonStyle('ghost' as ButtonVariant, 'sm' as any)}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">לעמוד הראשון</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Previous page */}
          <button
            className={getButtonStyle('ghost' as ButtonVariant, 'sm' as any)}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">לעמוד הקודם</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Page numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              className={`${
                page === currentPage
                  ? getButtonStyle('primary' as ButtonVariant, 'sm' as any)
                  : getButtonStyle('ghost' as ButtonVariant, 'sm' as any)
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          
          {/* Next page */}
          <button
            className={getButtonStyle('ghost' as ButtonVariant, 'sm' as any)}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">לעמוד הבא</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Last page */}
          <button
            className={getButtonStyle('ghost' as ButtonVariant, 'sm' as any)}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">לעמוד האחרון</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;