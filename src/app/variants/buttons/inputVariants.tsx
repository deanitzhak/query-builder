import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  // Base styles applied to all input variants
  "rounded border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-300 hover:bg-gray-50 focus:border-[#0f1729] focus:ring-[#0f1729]",
        primary: "bg-white border-[#0f1729] hover:border-[#1a2844] focus:border-[#0f1729] focus:ring-[#0f1729]",
        secondary: "bg-white border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:ring-gray-400",
        tertiary: "bg-transparent border-gray-200 hover:bg-gray-50 focus:border-gray-300 focus:ring-gray-300",
        error: "bg-white border-red-500 hover:border-red-600 focus:border-red-500 focus:ring-red-500",
        disabled: "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        sm: "py-1 px-3 text-sm h-8",
        md: "py-2 px-4 text-base h-10",
        lg: "py-3 px-6 text-lg h-12"
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fixed: "w-[300px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      width: "full"
    }
  }
);

// Helper function to get input classes
export function getInputClass({ 
  variant = "default", 
  size = "md",
  width = "full",
  className = "" 
}: {
  variant?: "default" | "primary" | "secondary" | "tertiary" | "error" | "disabled";
  size?: "sm" | "md" | "lg";
  width?: "auto" | "full" | "fixed";
  className?: string;
}) {
  return `${inputVariants({ variant, size, width })} ${className}`;
}