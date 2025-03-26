import { cva } from 'class-variance-authority';

export const dateSelectorVariants = cva(
  // Base styles applied to all variants
  "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center border",
  {
    variants: {
      variant: {
        primary: "bg-white border-gray-300 hover:bg-gray-50 text-[#0f1729] focus:ring-[#0f1729]",
        secondary: "bg-white border-gray-300 hover:bg-gray-50 text-gray-800 focus:ring-gray-400",
        tertiary: "bg-white border-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300",
      },
      size: {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

// Variants for the date input fields with white background
export const dateInputVariants = cva(
  "rounded border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-300 hover:bg-gray-50 focus:border-[#0f1729] focus:ring-[#0f1729]",
        primary: "bg-white border-[#0f1729] hover:border-[#1a2844] focus:border-[#0f1729] focus:ring-[#0f1729]",
        secondary: "bg-white border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:ring-gray-400",
      },
      size: {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-3 text-base",
        lg: "py-3 px-4 text-lg"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);