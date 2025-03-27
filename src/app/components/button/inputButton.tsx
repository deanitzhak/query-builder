import React, { useState } from "react";
import { getInputClass } from "../../variants/buttons/inputVariants";

interface InputButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onInputChange?: (value: string) => void;
  initialValue?: string;
  disabled?: boolean;
}

export default function InputButton({
  label,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  placeholder = "חיפוש...",
  onInputChange,
  initialValue = "",
  disabled = false,
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

  // Get button styling based on variant
  const getButtonStyle = () => {
    const baseStyle = `
      min-w-[72px] flex items-center justify-center
      rounded-l-xl
      font-medium
      transition-all duration-300
      ${inputHeights[size] || 'h-10'}
      ${buttonPadding[size] || 'px-4'}
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    `;

    const variantStyles = {
      primary: `
        bg-[#0f1729] text-white border-0
        shadow-[0_1px_2px_rgba(0,0,0,0.1)]
        hover:bg-[#1a2844] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12)]
        active:bg-[#0a0f1a] active:shadow-[0_1px_1px_rgba(0,0,0,0.15)]
      `,
      secondary: `
        bg-gray-100/90 text-gray-800 border-0
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        hover:bg-gray-200/90 hover:shadow-[0_2px_4px_rgba(0,0,0,0.08)]
        active:bg-gray-300/90 active:shadow-[0_1px_1px_rgba(0,0,0,0.1)]
      `,
      tertiary: `
        bg-white/95 text-gray-700 border-0
        shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]
        hover:bg-gray-50/95 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.09),0_2px_4px_rgba(0,0,0,0.06)]
        active:bg-gray-100/95 active:shadow-[0_0_0_1px_rgba(0,0,0,0.09),0_1px_1px_rgba(0,0,0,0.08)]
      `,
      ghost: `
        bg-transparent text-gray-700 border-0
        hover:bg-gray-50/90
        active:bg-gray-100/90
      `,
      glass: `
        bg-white/10 backdrop-blur-md text-white border-0
        shadow-[0_0_0_1px_rgba(255,255,255,0.1)]
        hover:bg-white/15 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]
        active:bg-white/20 active:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]
      `
    };

    return `${baseStyle} ${variantStyles[variant]}`;
  };

  // Get input variant based on button variant
  const getInputVariant = () => {
    const variantMap = {
      primary: "default",
      secondary: "secondary",
      tertiary: "tertiary",
      ghost: "ghost",
      glass: "glass"
    };
    
    return disabled ? "disabled" : variantMap[variant] || "default";
  };
  
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
          className={getInputClass({
            variant: getInputVariant() as any,
            size,
            width: "full",
            className: "rounded-r-xl rounded-l-none" // RTL layout with rounded corner adjustment
          })}
        />
        <button
          type="submit"
          className={getButtonStyle()}
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