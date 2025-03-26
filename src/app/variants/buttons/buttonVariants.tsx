import { cva } from 'class-variance-authority';

export const AddbuttonVariants = cva(
  "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: { 
        primary: "bg-[#0f1729] hover:bg-[#1a2844] text-white focus:ring-[#0f1729]",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
        tertiary: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300",
        destructive: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
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

// For backward compatibility
export const buttonVariants = AddbuttonVariants;