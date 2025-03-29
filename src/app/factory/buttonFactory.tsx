// src/app/factory/buttonFactory.tsx
import React from 'react';
import { getButtonComponent } from '../patterns/registration/buttonRegistry';

// Define the button configuration interface
export interface ButtonConfig {
  type: string;
  label: string;
  icon?: string;
  action?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive' | 'ghost' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  [key: string]: any; // Allow additional configuration properties
}

interface ButtonFactoryProps {
  config: ButtonConfig;
  onAction?: (action: string) => void;
  onDateChange?: (start: string | null, end: string | null) => void;
  className?: string;
  index?: number;
}

/**
 * Pure reflection-based ButtonFactory
 * No type-specific handling - all buttons treated the same way
 */
const ButtonFactory: React.FC<ButtonFactoryProps> = ({
  config,
  onAction,
  onDateChange,
  className = '',
  index
}) => {
  const { type, action, ...buttonProps } = config;
  
  // Get the component from the registry
  const ButtonComponent = getButtonComponent(type);
  
  // If no component found, return null
  if (!ButtonComponent) {
    console.warn(`Button type "${type}" not found in registry. Available types: ${getButtonComponent('') ? 'None' : 'Unknown'}`);
    return null;
  }
  
  // Create props object with all available props
  // Each button component will use what it needs and ignore the rest
  const props = {
    ...buttonProps,
    className: `${type}-button ${className}`,
    onClick: () => onAction && action && onAction(action),
    onChange: onDateChange
  };
  
  // Return the button component
  return <ButtonComponent {...props} />;
};

export default ButtonFactory;