// src/types/interfaces/edit/IEditSection.ts

export type EditSectionVariant = 'default' | 'primary' | 'secondary' | 'minimal' | 'purple';
export type EditSectionSize = 'sm' | 'md' | 'lg';

/**
 * Props interface for the EditSection component
 */
export interface IEditSectionProps {
  /**
   * Whether the section is currently visible
   */
  isVisible: boolean;
  
  /**
   * Function to call when the close button is clicked
   */
  onClose: () => void;
  
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Optional subtitle for additional context
   */
  subtitle?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Visual variant of the section
   */
  variant?: EditSectionVariant;
  
  /**
   * Size variant affecting padding and text size
   */
  size?: EditSectionSize;
  
  /**
   * Content to be displayed inside the edit section
   */
  children: React.ReactNode;
}

/**
 * Interface for the form fields within the edit section
 */
export interface IEditField {
  /**
   * Unique identifier for the field
   */
  id: string;
  
  /**
   * Display label for the field
   */
  label: string;
  
  /**
   * The type of form field
   */
  type: 'text' | 'select' | 'date' | 'number' | 'checkbox' | 'radio' | 'textarea';
  
  /**
   * Current value of the field
   */
  value: any;
  
  /**
   * Options for select, radio, or checkbox fields
   */
  options?: Array<{ value: string; label: string }>;
  
  /**
   * Placeholder text for the field
   */
  placeholder?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  
  /**
   * Regular expression for validation
   */
  validation?: RegExp;
  
  /**
   * Error message to display when validation fails
   */
  errorMessage?: string;
}

/**
 * Interface for the edit section context data
 */
export interface IEditSectionContext {
  /**
   * Array of field definitions
   */
  fields: IEditField[];
  
  /**
   * Function to update a field value
   */
  updateField: (id: string, value: any) => void;
  
  /**
   * Whether all required fields are valid
   */
  isValid: boolean;
  
  /**
   * Record of current validation errors
   */
  errors: Record<string, string>;
  
  /**
   * Function to submit the form
   */
  submit: () => Promise<boolean>;
  
  /**
   * Function to reset the form
   */
  reset: () => void;
}