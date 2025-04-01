// src/components/edit/editSection.tsx
import React, { useRef, useEffect, useState } from 'react';
import { IQuery } from '../../../types/queries/IQueryBuilder';

interface EditSectionProps {
  isVisible: boolean;
  onClose: () => void;
  onSearch?: (query: IQuery) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * EditSection component that slides down when visible
 * Contains content for advanced search or editing with proper scrolling
 */
const EditSection: React.FC<EditSectionProps> = ({
  isVisible,
  onClose,
  onSearch,
  className = '',
  children
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [scrollable, setScrollable] = useState(false);
  const [maxHeight, setMaxHeight] = useState('60vh');
  
  // Handle animation when visibility changes
  useEffect(() => {
    if (isVisible && sectionRef.current) {
      // Get the content height
      const sectionHeight = sectionRef.current.scrollHeight;
      
      // Start at 0 and animate to full height
      setHeight(0);
      setTimeout(() => {
        // Check if content is taller than the max height to determine if scrolling is needed
        if (contentRef.current && contentRef.current.scrollHeight > window.innerHeight * 0.6) {
          setScrollable(true);
        } else {
          setScrollable(false);
        }
        
        setHeight(sectionHeight);
      }, 10);
      
      // After animation is complete, set height to auto
      setTimeout(() => {
        setHeight(null);
      }, 300);
    } else {
      // Animate to 0 when hiding
      if (sectionRef.current) {
        const currentHeight = sectionRef.current.offsetHeight;
        setHeight(currentHeight);
        
        // Force a reflow
        sectionRef.current.getBoundingClientRect();
        
        setTimeout(() => {
          setHeight(0);
        }, 10);
      }
    }
  }, [isVisible]);

  // Calculate max height dynamically based on window size
  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(`${window.innerHeight * 0.6}px`);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className={`bg-white border border-gray-200 rounded-md shadow-md overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={{ 
        height: height != null ? `${height}px` : 'auto',
        display: !isVisible && height === 0 ? 'none' : 'block'
      }}
    >
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#4e165a]">חיפוש מתקדם</h3>
        
        <button 
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          aria-label="סגור"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div 
        ref={contentRef}
        className={`p-4 ${scrollable ? 'overflow-y-auto' : ''}`}
        style={scrollable ? { maxHeight } : {}}
      >
        {children}
      </div>
    </div>
  );
};

export default EditSection;