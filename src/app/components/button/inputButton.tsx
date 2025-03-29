// src/components/button/inputButton.tsx
import React, { useState } from "react";
import { withButtonRegistration } from "../../patterns/decorator/buttonDecorator";
import { getButtonStyle, getInputStyle, mapVariant, ButtonVariant } from "../../variants/buttonThemes";

interface InputButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onInputChange?: (value: string) => void;
  initialValue?: string;
  disabled?: boolean;
  icon?: string;
}

function InputButton({
  label,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  placeholder = "חיפוש...",
  onInputChange,
  initialValue = "",
  disabled = false,
  icon,
}: InputButtonProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onClick();
    }
  };

  // Input height based on size
  const inputHeights = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  };
  
  // Button padding based on size
  const buttonPadding = {
    sm: "px-3",
    md: "px-4",
    lg: "px-5"
  };

  // Get button styling from themes
  const getButtonStyles = () => {
    const baseStyle = `
      min-w-[72px] flex items-center justify-center
      rounded-l-xl
      font-medium
      transition-all duration-300
      ${inputHeights[size] || 'h-10'}
      ${buttonPadding[size] || 'px-4'}
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    `;

    // Use the themed style for the button
    return `${baseStyle} ${getButtonStyle(variant, size, 'auto')}`;
  };

  // Get input variant based on button variant using the mapping function
  const inputVariant = disabled ? "disabled" : mapVariant(variant as ButtonVariant, "buttonToInput");
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative inline-flex items-center ${className}`}
    >
      <div 
        className={`
          relative flex w-full overflow-hidden transition-all duration-300
          ${isFocused && !disabled ? `shadow-[0_0_0_4px_rgba(15,23,41,0.08)]` : ''}
          rounded-xl
        `}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={getInputStyle({
            variant: inputVariant as any,
            size,
            width: "full",
            className: "rounded-r-xl rounded-l-none" // RTL layout with rounded corner adjustment
          })}
        />
        <button
          type="submit"
          className={getButtonStyles()}
          aria-label={label}
          disabled={disabled}
        >
          <span className="button-label">{label}</span>
          
          {/* Subtle glow effect when active */}
          {value.trim() && !disabled && (
            <span className="absolute inset-0 bg-current opacity-5 rounded-l-xl" />
          )}
        </button>
      </div>
    </form>
  );
}

// Register this component with the button registry
export default withButtonRegistration(InputButton, 'input');