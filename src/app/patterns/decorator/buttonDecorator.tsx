// src/components/button/registry/ButtonDecorator.tsx
import React from 'react';
import { registerButton, BaseButtonProps } from '../registration/buttonRegistry';

/**
 * Decorator function to auto-register a button component
 * @param buttonType The type identifier for this button
 * @returns A decorator function that will register the component
 */
export function RegisterButton(buttonType: string) {
  return function<T extends BaseButtonProps>(WrappedComponent: React.ComponentType<T>) {
    // Register the component
    registerButton(buttonType, WrappedComponent);
    
    // Return the original component unchanged
    return WrappedComponent;
  };
}

/**
 * Higher-order component to auto-register a button
 * (Alternative to decorator for projects not using TypeScript decorators)
 * @param WrappedComponent The button component to register
 * @param buttonType The type identifier for this button
 * @returns The original component, registered in the system
 */
export function withButtonRegistration<T extends BaseButtonProps>(
  WrappedComponent: React.ComponentType<T>,
  buttonType: string
): React.ComponentType<T> {
  // Register the component
  registerButton(buttonType, WrappedComponent);
  console.log(`Button type '${buttonType}' registered via HOC`);
  
  // Return the original component unchanged
  return WrappedComponent;
}