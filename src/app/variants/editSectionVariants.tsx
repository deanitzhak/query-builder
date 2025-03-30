// src/variants/editSectionVariants.tsx
import { cva } from 'class-variance-authority';
import { EditSectionVariant, EditSectionSize } from '../../types/interfaces/layout/IEditSection';

// Container styles for the edit section
export const editSectionContainerVariants = cva(
  "w-full rounded-md mt-4 mb-6 rtl",
  {
    variants: {
      variant: {
        default: "bg-white border border-[#ad7eba]/30 shadow-sm",
        primary: "bg-white border-t-4 border-t-[#4e165a] border-r border-l border-b border-[#ad7eba]/30 shadow-md",
        secondary: "bg-[#f2e8f5]/30 border border-[#ad7eba]/20 shadow-sm",
        minimal: "bg-gray-50 border border-gray-200",
        purple: "bg-gradient-to-r from-[#f2e8f5]/50 to-white border border-[#ad7eba]/20 shadow-sm",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);

// Header styles for the edit section
export const editSectionHeaderVariants = cva(
  "border-b px-4 py-3",
  {
    variants: {
      variant: {
        default: "border-[#ad7eba]/20 bg-[#f2e8f5]/20",
        primary: "border-[#ad7eba]/30 bg-[#f2e8f5]/30",
        secondary: "border-[#ad7eba]/10 bg-[#f2e8f5]/10",
        minimal: "border-gray-200 bg-gray-50",
        purple: "border-[#ad7eba]/20 bg-gradient-to-r from-[#f2e8f5]/40 to-white",
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-5 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);

// Title styles for the edit section
export const editSectionTitleVariants = cva(
  "font-medium",
  {
    variants: {
      variant: {
        default: "text-[#4e165a]",
        primary: "text-[#4e165a]",
        secondary: "text-[#7a3b88]",
        minimal: "text-gray-700",
        purple: "text-[#4e165a]",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);

// Subtitle styles for the edit section
export const editSectionSubtitleVariants = cva(
  "text-sm mt-1",
  {
    variants: {
      variant: {
        default: "text-gray-600",
        primary: "text-gray-600",
        secondary: "text-gray-600",
        minimal: "text-gray-500",
        purple: "text-gray-600",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);

// Content styles for the edit section
export const editSectionContentVariants = cva(
  "p-4",
  {
    variants: {
      variant: {
        default: "bg-white",
        primary: "bg-white",
        secondary: "bg-white",
        minimal: "bg-white",
        purple: "bg-white",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);

// Helper function to get all the styles for the edit section
export function getEditSectionStyles(
  variant: EditSectionVariant = 'default',
  size: EditSectionSize = 'md'
) {
  return {
    container: editSectionContainerVariants({ variant, size }),
    header: editSectionHeaderVariants({ variant, size }),
    title: editSectionTitleVariants({ variant, size }),
    subtitle: editSectionSubtitleVariants({ variant, size }),
    content: editSectionContentVariants({ variant, size }),
  };
}