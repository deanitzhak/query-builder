import { cva } from 'class-variance-authority';

// Modern color palette based on #4e165a
// Primary: #4e165a (deep purple)
// Light: #7a3b88 (medium purple)
// Lighter: #ad7eba (light purple)
// Ultra Light: #f2e8f5 (barely purple)

export const dateSelectorVariants = cva(
  "rounded-md font-medium transition-all duration-200 border focus:outline-none flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: `
          bg-white text-[#4e165a] border-[#7a3b88]/40
          hover:bg-[#f2e8f5]/30 hover:border-[#7a3b88]
          focus:ring-1 focus:ring-[#4e165a]/20 focus:border-[#4e165a]
          active:bg-[#f2e8f5]/50
        `,
        secondary: `
          bg-[#f2e8f5]/50 text-[#4e165a] border-[#ad7eba]/30
          hover:bg-[#f2e8f5]/80 hover:border-[#ad7eba]
          focus:ring-1 focus:ring-[#7a3b88]/30 focus:border-[#7a3b88]
          active:bg-[#f2e8f5]/60
        `,
        tertiary: `
          bg-transparent text-[#4e165a] border-[#ad7eba]/20
          hover:bg-[#f2e8f5]/30 hover:border-[#ad7eba]/40
          focus:ring-1 focus:ring-[#ad7eba]/40 focus:border-[#ad7eba]
          active:bg-[#f2e8f5]/40
        `,
        glass: `
          bg-[#4e165a]/8 backdrop-blur-md text-white border-[#ad7eba]/20
          hover:bg-[#4e165a]/15 hover:border-[#ad7eba]/30
          focus:ring-1 focus:ring-[#ad7eba]/20 focus:border-[#ad7eba]/40
          active:bg-[#4e165a]/20
        `
      },
      size: {
        sm: "h-8 py-1.5 px-3 text-sm border-[1px]",
        md: "h-10 py-2 px-4 text-base border-[1px]",
        lg: "h-12 py-2.5 px-5 text-lg border-[1px]"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

// Professional date input fields with modern purple accents
export const dateInputVariants = cva(
  "rounded-md font-sans focus:outline-none transition-all duration-200 border placeholder:text-gray-400/70",
  {
    variants: {
      variant: {
        // Default - Clean, modern input with purple accents
        default: `
          bg-white text-gray-800 border-gray-300
          hover:border-[#7a3b88]
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
          bg-[#f2e8f5]/50 text-gray-800 border-[#ad7eba]/30
          hover:border-[#ad7eba] hover:bg-[#f2e8f5]/80
          focus:bg-white focus:border-[#7a3b88] focus:ring-1 focus:ring-[#7a3b88]/20
        `,
        // Disabled - Non-interactive state
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
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// Calendar day button styles - updated with purple theme
export const calendarDayVariants = cva(
  "flex items-center justify-center rounded-sm transition-all duration-200 border-[1px]",
  {
    variants: {
      variant: {
        default: "hover:bg-[#f2e8f5]/50 text-gray-700 border-transparent",
        selected: "bg-[#4e165a] text-white border-[#4e165a] hover:bg-[#7a3b88]",
        today: "font-medium text-[#4e165a] border-[#ad7eba]/40",
        disabled: "text-gray-300 border-transparent cursor-not-allowed",
        range: "bg-[#f2e8f5]/70 text-[#4e165a] border-[#ad7eba]/20 hover:bg-[#f2e8f5]/90",
      },
      size: {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// Helper function to get date input classes
export function getDateInputClass({ 
  variant = "default", 
  size = "md",
  className = "" 
}: {
  variant?: "default" | "primary" | "secondary" | "disabled";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return `${dateInputVariants({ variant, size })} ${className}`;
}