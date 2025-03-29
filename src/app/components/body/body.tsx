// src/components/layout/Body.tsx
import React from 'react';
import { BodyProps } from '../../../types/interfaces/layout/body';

/**
 * Body component that serves as a container for the main content
 * This follows the principles of dependency injection by accepting children as props
 */
const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <main className="flex-1 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </main>
  );
};

export default Body;