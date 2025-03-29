// src/components/button/addButton.tsx
import React from "react";
import { AddButtonProps } from "../../../types/interfaces/buttons/IButton";
import { AddbuttonVariants } from "../../variants/buttons/buttonVariants";
import { withButtonRegistration } from "../../patterns/decorator/buttonDecorator";

function AddButton({ 
  label, 
  onClick, 
  icon, 
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false
}: AddButtonProps) {
  return (
    <button 
      className={`
        group relative overflow-hidden rounded-md font-medium transition-all
        ${AddbuttonVariants({ variant, size, width: fullWidth ? 'full' : 'auto' })}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'transform hover:-translate-y-[1px] active:translate-y-0'}
        ${className}
      `} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="button-icon flex-shrink-0">{icon}</span>}
        {label && <span className="button-label">{label}</span>}
      </div>
      <span className="absolute inset-0 z-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

// Register this component with the button registry
export default withButtonRegistration(AddButton, 'button');