import { cva } from 'class-variance-authority';

// Modern color palette based on #4e165a
// Primary: #4e165a (deep purple)
// Light: #7a3b88 (medium purple)
// Lighter: #ad7eba (light purple)
// Ultra Light: #f2e8f5 (barely purple)

export const inputVariants = cva(
  "font-sans rounded-md text-base placeholder:text-gray-400/70 transition-all duration-200 border focus:outline-none",
  {
    variants: {
      variant: {
        // Default - Clean, modern input with purple accents
        default: `
          bg-white text-gray-800 border-gray-300
          hover:border-[#7a3b88]/60
          focus:border-[#4e165a] focus:ring-1 focus:ring-[#4e165a]/15
        `,
        
        // Primary - Bold, purple-focused input
        primary: `
          bg-white text-gray-900 border-[#7a3b88]/40
          hover:border-[#7a3b88]
          focus:border-[#4e165a] focus:ring-1 focus:ring-[#4e165a]/20
        `,
        
        // Secondary - Subtle filled input with soft purple background
        secondary: `
          bg-[#f2e8f5]/60 text-gray-800 border-[#ad7eba]/30
          hover:border-[#ad7eba] hover:bg-[#f2e8f5]/80
          focus:bg-white focus:border-[#7a3b88] focus:ring-1 focus:ring-[#7a3b88]/20
        `,
        
        // Tertiary - Super minimal design with purple hints
        tertiary: `
          bg-transparent text-gray-700 border-gray-200
          hover:bg-[#f2e8f5]/30 hover:border-[#ad7eba]/40
          focus:bg-white focus:border-[#ad7eba] focus:ring-1 focus:ring-[#ad7eba]/20
        `,
        
        // Ghost - Nearly invisible until interaction
        ghost: `
          bg-transparent text-gray-700 border-transparent
          hover:bg-[#f2e8f5]/40 hover:border-[#ad7eba]/20
          focus:bg-white focus:border-[#ad7eba] focus:ring-1 focus:ring-[#ad7eba]/20
        `,
        
        // Glass - Frosted glass effect with purple tint
        glass: `
          bg-[#4e165a]/8 backdrop-blur-md text-white border-[#ad7eba]/20
          placeholder:text-white/60
          hover:bg-[#4e165a]/15 hover:border-[#ad7eba]/30
          focus:bg-[#4e165a]/15 focus:border-[#ad7eba]/40 focus:ring-1 focus:ring-[#ad7eba]/20
        `,
        
        // Error - Clear visual indication of error
        error: `
          bg-white text-gray-900 border-red-300
          placeholder:text-red-500/60
          hover:border-red-400
          focus:border-red-500 focus:ring-1 focus:ring-red-400/20
        `,
        
        // Disabled - Clearly shows non-interactive state
        disabled: `
          bg-gray-50/60 text-gray-400 border-gray-200
          placeholder:text-gray-400/60
          backdrop-blur-[1px]
          cursor-not-allowed
        `,
      },
      
      size: {
        sm: "h-8 py-1.5 px-3 text-sm leading-tight border-[1px]",
        md: "h-10 py-2 px-4 text-base leading-normal border-[1px]",
        lg: "h-12 py-2.5 px-5 text-lg leading-relaxed border-[1px]"
      },
      
      width: {
        auto: "w-auto",
        full: "w-full",
        fixed: "w-[320px]"
      }
    },
    
    defaultVariants: {
      variant: "default",
      size: "md",
      width: "full"
    }
  }
);

// Icon variants for input elements
export const inputIconVariants = cva(
  "flex items-center justify-center transition-all duration-200",
  {
    variants: {
      variant: {
        // Default - Clean, modern icon with purple accents
        default: `
          text-gray-400
          group-hover:text-gray-500
          group-focus-within:text-[#4e165a]
        `,
        
        // Primary - Bold, purple-focused icon
        primary: `
          text-[#7a3b88]/70
          group-hover:text-[#7a3b88]
          group-focus-within:text-[#4e165a]
        `,
        
        // Secondary - Subtle filled icon with soft purple styling
        secondary: `
          text-[#7a3b88]/60
          group-hover:text-[#7a3b88]/80
          group-focus-within:text-[#4e165a]
        `,
        
        // Tertiary - Super minimal design with purple hints
        tertiary: `
          text-gray-400
          group-hover:text-[#7a3b88]/70
          group-focus-within:text-[#7a3b88]
        `,
        
        // Ghost - Nearly invisible until interaction
        ghost: `
          text-gray-400/80
          group-hover:text-[#7a3b88]/60
          group-focus-within:text-[#7a3b88]
        `,
        
        // Glass - Frosted glass effect with purple tint
        glass: `
          text-white/70
          group-hover:text-white/80
          group-focus-within:text-white
        `,
        
        // Error - Clear visual indication of error
        error: `
          text-red-400
          group-hover:text-red-500
          group-focus-within:text-red-600
        `,
        
        // Disabled - Clearly shows non-interactive state
        disabled: `
          text-gray-300
          cursor-not-allowed
        `,
      },
      
      position: {
        leading: "absolute left-3",
        trailing: "absolute right-3",
      },
      
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
    },
    
    defaultVariants: {
      variant: "default",
      position: "trailing",
      size: "md"
    }
  }
);

// Helper function to get input classes
export function getInputClass({ 
  variant = "default", 
  size = "md",
  width = "full",
  className = "",
  hasLeadingIcon = false,
  hasTrailingIcon = false
}: {
  variant?: "default" | "primary" | "secondary" | "tertiary" | "ghost" | "glass" | "error" | "disabled";
  size?: "sm" | "md" | "lg";
  width?: "auto" | "full" | "fixed";
  className?: string;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
}) {
  // Adjust padding if icons are present
  const iconPadding = {
    sm: { leading: "pl-8", trailing: "pr-8" },
    md: { leading: "pl-10", trailing: "pr-10" },
    lg: { leading: "pl-12", trailing: "pr-12" }
  };
  
  let additionalClasses = "";
  
  if (hasLeadingIcon) {
    additionalClasses += ` ${iconPadding[size].leading}`;
  }
  
  if (hasTrailingIcon) {
    additionalClasses += ` ${iconPadding[size].trailing}`;
  }
  
  return `${inputVariants({ variant, size, width })} ${additionalClasses} ${className}`;
}

// Helper function to get icon classes
export function getInputIconClass({
  variant = "default",
  position = "trailing",
  size = "md",
  className = ""
}: {
  variant?: "default" | "primary" | "secondary" | "tertiary" | "ghost" | "glass" | "error" | "disabled";
  position?: "leading" | "trailing";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return `${inputIconVariants({ variant, position, size })} ${className}`;
}