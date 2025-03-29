// src/app/patterns/registration/buttonRegistry.tsx
import React from 'react';
import { scanButtonDirectory } from './ButtonScanner';

// Define the common props that all button types should accept
export interface BaseButtonProps {
  label: string;
  icon?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive' | 'ghost' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (startDate: string | null, endDate: string | null) => void;
  placeholder?: string;
  onInputChange?: (value: string) => void;
  initialValue?: string;
  [key: string]: any;
}

// Registry to store all button components
const buttonRegistry = new Map<string, React.ComponentType<any>>();

/**
 * Register a button component with the registry
 */
export const registerButton = (type: string, component: React.ComponentType<any>): void => {
  if (buttonRegistry.has(type)) {
    console.warn(`Button type '${type}' is already registered - skipping`);
    return; // Don't overwrite if already exists
  }
  buttonRegistry.set(type, component);
  console.log(`Button type '${type}' registered successfully. Registry now has ${buttonRegistry.size} components.`);
};

/**
 * Get a button component by its type
 */
export const getButtonComponent = (type: string): React.ComponentType<any> | null => {
  return buttonRegistry.get(type) || null;
};

/**
 * Get all registered button types
 */
export const getRegisteredButtonTypes = (): string[] => {
  return Array.from(buttonRegistry.keys());
};

/**
 * Check if a button type is registered
 */
export const isButtonRegistered = (type: string): boolean => {
  return buttonRegistry.has(type);
};

/**
 * Clear all registered buttons
 */
export const clearButtonRegistry = (): void => {
  buttonRegistry.clear();
};

/**
 * Initialize button registry by discovering all button components
 * This function follows the Open/Closed principle by not requiring modification
 * when new button types are added
 */
export const initializeButtonRegistry = async (): Promise<void> => {
  try {
    console.log('Initializing button registry...');
    
    // Auto-discover and register all button components
    scanButtonDirectory();
    
    // Check if any buttons were registered
    const registeredTypes = getRegisteredButtonTypes();
    if (registeredTypes.length === 0) {
      console.warn('No buttons were registered. UI elements may not appear correctly.');
    } else {
      console.log(`Button registry initialization complete with ${registeredTypes.length} components`);
      console.log(`Registered types: ${registeredTypes.join(', ')}`);
    }
  } catch (error) {
    console.error('Failed to initialize button registry:', error);
  }
};