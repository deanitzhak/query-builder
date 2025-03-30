// src/components/edit/EditForm.tsx
import React, { useState, useEffect } from 'react';
import { IEditField } from '../../../types/interfaces/layout/IEditSection';

import { getInputStyle } from '../../variants/buttonThemes';

interface EditFormProps {
  fields: IEditField[];
  onSubmit: (formData: Record<string, any>) => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

const EditForm: React.FC<EditFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  submitLabel = 'שמור',
  cancelLabel = 'בטל',
  className = ''
}) => {
  // State for form values
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize form data from fields
  useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      initialData[field.id] = field.value;
    });
    setFormData(initialData);
  }, [fields]);

  // Handle field change
  const handleChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [fieldId]: true
    }));
    
    // Validate on change
    validateField(fieldId, value);
  };

  // Validate a single field
  const validateField = (fieldId: string, value: any) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    let error = '';

    // Required validation
    if (field.required && (value === '' || value === null || value === undefined)) {
      error = field.errorMessage || 'שדה חובה';
    }

    // Pattern validation if provided
    if (field.validation && value && !field.validation.test(String(value))) {
      error = field.errorMessage || 'ערך לא תקין';
    }

    // Update errors state
    setErrors(prev => ({
      ...prev,
      [fieldId]: error
    }));
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach(field => {
      allTouched[field.id] = true;
      
      // Validate each field
      if (field.required && (formData[field.id] === '' || formData[field.id] === null || formData[field.id] === undefined)) {
        newErrors[field.id] = field.errorMessage || 'שדה חובה';
        isValid = false;
      } else if (field.validation && formData[field.id] && !field.validation.test(String(formData[field.id]))) {
        newErrors[field.id] = field.errorMessage || 'ערך לא תקין';
        isValid = false;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Render form field based on type
  const renderField = (field: IEditField) => {
    const { id, label, type, placeholder, required, disabled, options } = field;
    const value = formData[id] || '';
    const error = touched[id] ? errors[id] : '';
    
    const inputCommonProps = {
      id,
      name: id,
      disabled,
      placeholder,
      className: `${getInputStyle({
        variant: error ? 'error' : disabled ? 'disabled' : 'default',
        size: 'md',
      })}`
    };

    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            {...inputCommonProps}
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            {...inputCommonProps}
          />
        );
        
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            {...inputCommonProps}
          />
        );
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            {...inputCommonProps}
          >
            <option value="">בחר...</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(id, e.target.checked)}
              id={id}
              name={id}
              disabled={disabled}
              className="h-4 w-4 text-[#4e165a] focus:ring-[#4e165a]/20 border-gray-300 rounded"
            />
            <label htmlFor={id} className="mr-2 text-gray-700">
              {label}
            </label>
          </div>
        );
        
      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            {options?.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  checked={value === option.value}
                  onChange={() => handleChange(id, option.value)}
                  id={`${id}-${option.value}`}
                  name={id}
                  disabled={disabled}
                  className="h-4 w-4 text-[#4e165a] focus:ring-[#4e165a]/20 border-gray-300"
                />
                <label htmlFor={`${id}-${option.value}`} className="mr-2 text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
        
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            rows={4}
            {...inputCommonProps}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.id} className={`form-group ${field.type === 'checkbox' || field.type === 'radio' ? '' : 'flex flex-col'}`}>
            {field.type !== 'checkbox' && (
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 mr-1">*</span>}
              </label>
            )}
            
            {renderField(field)}
            
            {touched[field.id] && errors[field.id] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end space-x-4 space-x-reverse mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className={getInputStyle({
            variant: 'ghost',
            size: 'md',
            className: 'w-auto px-4',
          })}
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          className={getInputStyle({
            variant: 'primary',
            size: 'md',
            className: 'w-auto px-4 bg-[#4e165a] text-white',
          })}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EditForm;