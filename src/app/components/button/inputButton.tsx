import React, { useState } from "react";
import { getInputClass } from "../../variants/Buttons/inputVariants";
import { AddbuttonVariants } from "../../variants/Buttons/buttonVariants";

// by creating an interface we can use fatch loop for all inputs and buttons

interface InputButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
}

export default function InputButton({
  label,
  icon,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  placeholder = "חיפוש...",
}: InputButtonProps) {
  const [value, setValue] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick();
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={getInputClass({
            variant: "default",
            size,
            width: "auto",
            className: "pr-10 " // Changed from pl-10 to pr-10 for RTL layout
          })}
        />
        <button
          type="submit"
          className={`
            absolute left-2 p-1 rounded-full  
            ${AddbuttonVariants({ variant, size: "sm" })}
          `}
          aria-label={label}
        >
          {icon || "🔍"}
        </button>
      </div>
    </form>
  );
}