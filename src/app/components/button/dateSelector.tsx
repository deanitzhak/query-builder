// src/components/button/dateSelector.tsx
import React, { useState, useRef, useEffect } from 'react';
import { DateSelectorProps } from '../../../types/interfaces/buttons/IDateSelector';
import { withButtonRegistration } from '../../patterns/decorator/buttonDecorator';
import { 
  getButtonStyle, 
  getInputStyle, 
  ButtonVariant, 
  InputVariant 
} from '../../variants/buttonThemes';

function DateSelector({
  label,
  icon = "📅",
  onChange,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  startPlaceholder = "תאריך התחלה",
  endPlaceholder = "תאריך סיום"
}: DateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    onChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    onChange(startDate, e.target.value);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleApply = () => {
    onChange(startDate, endDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onChange(null, null);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`${getButtonStyle(variant as ButtonVariant, size as any)} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span className="mr-2">{icon}</span>
        {label}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 p-4 bg-white shadow-lg rounded-md z-50 rtl min-w-[300px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">{startPlaceholder}</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className={getInputStyle({
                  variant: "default" as InputVariant,
                  size: size as any
                })}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">{endPlaceholder}</label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className={getInputStyle({
                  variant: "default" as InputVariant,
                  size: size as any
                })}
              />
            </div>
            
            <div className="flex justify-between gap-2 mt-2">
              <button 
                type="button"
                onClick={handleClear}
                className={getButtonStyle("secondary" as ButtonVariant, "sm" as any)}
              >
                נקה
              </button>
              <button 
                type="button"
                onClick={handleApply}
                className={getButtonStyle(variant as ButtonVariant, "sm" as any)}
              >
                החל
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Register this component with the button registry
export default withButtonRegistration(DateSelector, 'date');