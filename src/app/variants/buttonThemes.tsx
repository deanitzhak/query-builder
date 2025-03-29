// src/themes/themes.tsx
import { cva } from 'class-variance-authority';

// Central color palette
export const colors = {
  // Primary theme - Purple
  purple: {
    primary: '#4e165a',
    light: '#7a3b88',
    lighter: '#ad7eba',
    ultraLight: '#f2e8f5',
  },
  // Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Status colors
  status: {
    success: {
      primary: 'emerald-700',
      light: 'emerald-400',
      lighter: 'emerald-300',
      bg: 'emerald-50',
    },
    warning: {
      primary: 'amber-700',
      light: 'amber-400',
      lighter: 'amber-300',
      bg: 'amber-50',
    },
    error: {
      primary: 'red-600',
      light: 'red-400',
      lighter: 'red-300',
      bg: 'red-50',
    },
  },
};

// Common variant styles that can be reused across components
export const commonVariants = {
  // Button variants
  button: {
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
    `,
    glass: `
      bg-white/10 backdrop-blur-md text-white border-0
      shadow-[0_0_0_1px_rgba(255,255,255,0.1)]
      hover:bg-white/15 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]
      active:bg-white/20 active:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]
    `,
  },
  
  input: {
    default: `
      bg-white text-gray-800 border-gray-300
      hover:border-[#7a3b88]/60
      focus:border-[#4e165a] focus:ring-1 focus:ring-[#4e165a]/15
    `,
    primary: `
      bg-white text-gray-900 border-[#7a3b88]/40
      hover:border-[#7a3b88]
      focus:border-[#4e165a] focus:ring-1 focus:ring-[#4e165a]/20
    `,
    secondary: `
      bg-[#f2e8f5]/60 text-gray-800 border-[#ad7eba]/30
      hover:border-[#ad7eba] hover:bg-[#f2e8f5]/80
      focus:bg-white focus:border-[#7a3b88] focus:ring-1 focus:ring-[#7a3b88]/20
    `,
    tertiary: `
      bg-transparent text-gray-700 border-gray-200
      hover:bg-[#f2e8f5]/30 hover:border-[#ad7eba]/40
      focus:bg-white focus:border-[#ad7eba] focus:ring-1 focus:ring-[#ad7eba]/20
    `,
    ghost: `
      bg-transparent text-gray-700 border-transparent
      hover:bg-[#f2e8f5]/40 hover:border-[#ad7eba]/20
      focus:bg-white focus:border-[#ad7eba] focus:ring-1 focus:ring-[#ad7eba]/20
    `,
    glass: `
      bg-[#4e165a]/8 backdrop-blur-md text-white border-[#ad7eba]/20
      placeholder:text-white/60
      hover:bg-[#4e165a]/15 hover:border-[#ad7eba]/30
      focus:bg-[#4e165a]/15 focus:border-[#ad7eba]/40 focus:ring-1 focus:ring-[#ad7eba]/20
    `,
    error: `
      bg-white text-gray-900 border-red-300
      placeholder:text-red-500/60
      hover:border-red-400
      focus:border-red-500 focus:ring-1 focus:ring-red-400/20
    `,
    disabled: `
      bg-gray-50/60 text-gray-400 border-gray-200
      placeholder:text-gray-400/60
      backdrop-blur-[1px]
      cursor-not-allowed
    `,
  },
  
  // InputIcon variants
  inputIcon: {
    default: `
      text-gray-400
      group-hover:text-gray-500
      group-focus-within:text-[#4e165a]
    `,
    primary: `
      text-[#7a3b88]/70
      group-hover:text-[#7a3b88]
      group-focus-within:text-[#4e165a]
    `,
    secondary: `
      text-[#7a3b88]/60
      group-hover:text-[#7a3b88]/80
      group-focus-within:text-[#4e165a]
    `,
    tertiary: `
      text-gray-400
      group-hover:text-[#7a3b88]/70
      group-focus-within:text-[#7a3b88]
    `,
    ghost: `
      text-gray-400/80
      group-hover:text-[#7a3b88]/60
      group-focus-within:text-[#7a3b88]
    `,
    glass: `
      text-white/70
      group-hover:text-white/80
      group-focus-within:text-white
    `,
    error: `
      text-red-400
      group-hover:text-red-500
      group-focus-within:text-red-600
    `,
    disabled: `
      text-gray-300
      cursor-not-allowed
    `,
  },
  
  // Calendar day variants
  calendarDay: {
    default: "hover:bg-[#f2e8f5]/50 text-gray-700 border-transparent",
    selected: "bg-[#4e165a] text-white border-[#4e165a] hover:bg-[#7a3b88]",
    today: "font-medium text-[#4e165a] border-[#ad7eba]/40",
    disabled: "text-gray-300 border-transparent cursor-not-allowed",
    range: "bg-[#f2e8f5]/70 text-[#4e165a] border-[#ad7eba]/20 hover:bg-[#f2e8f5]/90",
  }
};

// Common size definitions
export const sizes = {
  // Button sizes
  button: {
    xs: "h-7 py-1 px-2 text-xs gap-1.5 border-[1px]",
    sm: "h-8 py-1.5 px-3 text-sm gap-1.5 border-[1px]",
    md: "h-10 py-2 px-4 text-sm gap-2 border-[1px]",
    lg: "h-11 py-2.5 px-5 text-base gap-2 border-[1px]",
    xl: "h-12 py-3 px-6 text-lg gap-2.5 border-[1px]"
  },
  
  // Input sizes
  input: {
    sm: "h-8 py-1.5 px-3 text-sm leading-tight border-[1px]",
    md: "h-10 py-2 px-4 text-base leading-normal border-[1px]",
    lg: "h-12 py-2.5 px-5 text-lg leading-relaxed border-[1px]"
  },
  
  // Icon sizes
  icon: {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  },
  
  // Calendar day sizes
  calendarDay: {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base"
  }
};

// Define the allowed variant types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive' | 'ghost' | 'glass';
export type InputVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'glass' | 'error' | 'disabled';
export type IconVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'glass' | 'error' | 'disabled';
export type CalendarDayVariant = 'default' | 'selected' | 'today' | 'disabled' | 'range';

// Mapping between variant types (useful for transforming between related components)
export const variantMappings = {
  // Maps button variants to corresponding input variants
  buttonToInput: {
    primary: "default" as InputVariant,
    secondary: "secondary" as InputVariant,
    tertiary: "tertiary" as InputVariant,
    ghost: "ghost" as InputVariant,
    glass: "glass" as InputVariant,
    destructive: "error" as InputVariant,
    success: "default" as InputVariant,
    warning: "default" as InputVariant
  } as Record<ButtonVariant, InputVariant>,
  
  // Maps input variants to corresponding icon variants
  inputToIcon: {
    default: "default" as IconVariant,
    primary: "primary" as IconVariant,
    secondary: "secondary" as IconVariant,
    tertiary: "tertiary" as IconVariant,
    ghost: "ghost" as IconVariant,
    glass: "glass" as IconVariant,
    error: "error" as IconVariant,
    disabled: "disabled" as IconVariant
  } as Record<InputVariant, IconVariant>
};

// Re-export the cva functions but with our standardized variants
export const createButtonVariant = () => cva(
  "rounded-md font-medium transition-all duration-200 border focus:outline-none flex items-center justify-center",
  {
    variants: {
      variant: commonVariants.button,
      size: sizes.button,
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

export const createInputVariant = () => cva(
  "font-sans rounded-md text-base placeholder:text-gray-400/70 transition-all duration-200 border focus:outline-none",
  {
    variants: {
      variant: commonVariants.input,
      size: sizes.input,
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

export const createIconVariant = () => cva(
  "flex items-center justify-center transition-all duration-200",
  {
    variants: {
      variant: commonVariants.inputIcon,
      position: {
        leading: "absolute left-3",
        trailing: "absolute right-3",
      },
      size: sizes.icon,
    },
    defaultVariants: {
      variant: "default",
      position: "trailing",
      size: "md"
    }
  }
);

// Utility functions for getting the appropriate styles
export function getButtonStyle(
  variant: ButtonVariant = "primary", 
  size: keyof typeof sizes.button = "md", 
  width: "auto" | "full" = "auto", 
  className = ""
) {
  const buttonVariant = createButtonVariant();
  return `${buttonVariant({ variant, size, width })} ${className}`;
}

export function getInputStyle({
  variant = "default",
  size = "md",
  width = "full",
  className = "",
  hasLeadingIcon = false,
  hasTrailingIcon = false
}: {
  variant?: InputVariant;
  size?: keyof typeof sizes.input;
  width?: "auto" | "full" | "fixed";
  className?: string;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
}) {
  const inputVariant = createInputVariant();
  
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
  
  return `${inputVariant({ variant, size, width })} ${additionalClasses} ${className}`;
}

export function getIconStyle({
  variant = "default",
  position = "trailing",
  size = "md",
  className = ""
}: {
  variant?: IconVariant;
  position?: "leading" | "trailing";
  size?: keyof typeof sizes.icon;
  className?: string;
}) {
  const iconVariant = createIconVariant();
  return `${iconVariant({ variant, position, size })} ${className}`;
}

// Helper function to transform variants between related components
export function mapVariant(sourceVariant: ButtonVariant | InputVariant, mapping: "buttonToInput" | "inputToIcon"): InputVariant | IconVariant {
  if (mapping === "buttonToInput") {
    return variantMappings.buttonToInput[sourceVariant as ButtonVariant] || "default";
  } else {
    return variantMappings.inputToIcon[sourceVariant as InputVariant] || "default";
  }
}