import { cva } from 'class-variance-authority';

export const AddbuttonVariants = cva(
  "rounded-md font-medium transition-all duration-200 border focus:outline-none flex items-center justify-center",
  {
    variants: {
      variant: { 
        primary: `
          bg-white text-[#4e165a] border-[#7a3b88]/40
          hover:bg-[#f2e8f5] hover:border-[#7a3b88]
          focus:ring-1 focus:ring-[#4e165a]/20 focus:border-[#4e165a]
          active:bg-[#f2e8f5]/80
        `,
        secondary: `
          bg-[#f2e8f5] text-[#4e165a] border-[#ad7eba]/30
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
        success: `
          bg-white text-emerald-700 border-emerald-300
          hover:bg-emerald-50 hover:border-emerald-400
          focus:ring-1 focus:ring-emerald-300/30 focus:border-emerald-400
          active:bg-emerald-100/60
        `,
        warning: `
          bg-white text-amber-700 border-amber-300
          hover:bg-amber-50 hover:border-amber-400
          focus:ring-1 focus:ring-amber-300/30 focus:border-amber-400
          active:bg-amber-100/60
        `,
        destructive: `
          bg-white text-red-600 border-red-200
          hover:bg-red-50 hover:border-red-300
          focus:ring-1 focus:ring-red-300/30 focus:border-red-400
          active:bg-red-100/60
        `,
        ghost: `
          bg-transparent text-[#4e165a] border-transparent
          hover:bg-[#f2e8f5]/40 hover:border-[#ad7eba]/20
          focus:ring-1 focus:ring-[#ad7eba]/30 focus:border-[#ad7eba]/40
          active:bg-[#f2e8f5]/50
        `
      },
      size: {
        xs: "h-7 py-1 px-2 text-xs gap-1.5 border-[1px]",
        sm: "h-8 py-1.5 px-3 text-sm gap-1.5 border-[1px]",
        md: "h-10 py-2 px-4 text-sm gap-2 border-[1px]",
        lg: "h-11 py-2.5 px-5 text-base gap-2 border-[1px]",
        xl: "h-12 py-3 px-6 text-lg gap-2.5 border-[1px]"
      },
      width: {
        auto: "w-auto",
        full: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto"
    }
  }
);

// For backward compatibility
export const buttonVariants = AddbuttonVariants;