import React from "react";
import { AddButtonProps } from "../../../types/interfaces/buttons/IButton";
import { AddbuttonVariants } from "../../variants/Buttons/buttonVariants";

export default function AddButton({ 
  label, 
  onClick, 
  icon, 
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false
}: AddButtonProps) {
  // Local handler to debug clicks if needed
  const handleClick = () => {
    console.log('Button clicked');
    onClick(); // Call the passed onClick function
  };

  return (
    <button 
      className={`
        add-button rounded transition duration-200
        ${AddbuttonVariants({ variant, size })}
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `} 
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon mr-2">{icon}</span>}
      {label}
    </button>
  );
}