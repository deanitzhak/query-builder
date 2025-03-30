// src/components/edit/editSection.tsx
import React, { useRef, useEffect, useState } from 'react';

interface EditSectionProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple EditSection component that slides down when visible
 */
const EditSection: React.FC<EditSectionProps> = ({
  isVisible,
  onClose,
  children,
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  
  // Handle animation when visibility changes
  useEffect(() => {
    if (isVisible && sectionRef.current) {
      // Get the content height
      const sectionHeight = sectionRef.current.scrollHeight;
      
      // Start at 0 and animate to full height
      setHeight(0);
      setTimeout(() => {
        setHeight(sectionHeight);
      }, 10);
    } else {
      // Animate to 0 when hiding
      setHeight(0);
    }
  }, [isVisible]);
  
  // Don't render if not visible and height is 0
  if (!isVisible && height === 0) {
    return null;
  }
  
  return (
    <div 
      ref={sectionRef}
      className={`bg-white border border-gray-200 rounded-md shadow-md overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={{ height: height != null ? `${height}px` : 'auto' }}
    >
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default EditSection;