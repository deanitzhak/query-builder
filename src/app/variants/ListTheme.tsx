// src/themes/ListTheme.ts
import { cva } from 'class-variance-authority';

// Theme for list components
export const listContainerVariants = cva(
  "w-full overflow-x-auto rtl",
  {
    variants: {
      variant: {
        default: "bg-white rounded-lg shadow-md",
        bordered: "bg-white rounded-lg border border-gray-200",
        minimal: "bg-transparent",
        purple: "bg-white rounded-lg shadow-md border-t-4 border-t-[#4e165a]",
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

// Table variants
export const tableVariants = cva(
  "min-w-full divide-y divide-gray-200",
  {
    variants: {
      variant: {
        default: "border-separate border-spacing-0",
        bordered: "border border-gray-200",
        striped: "border-collapse",
        minimal: "border-none",
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

// Header row variants
export const tableHeaderRowVariants = cva(
  "border-b",
  {
    variants: {
      variant: {
        default: "bg-[#f2e8f5]",
        purple: "bg-[#4e165a] text-white",
        light: "bg-gray-50",
        minimal: "bg-transparent border-b-2 border-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

// Header cell variants
export const tableHeaderCellVariants = cva(
  "px-4 py-3 text-right font-medium tracking-wider whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-[#4e165a]",
        purple: "text-white",
        light: "text-gray-600",
        minimal: "text-gray-700",
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

// Table row variants
export const tableRowVariants = cva(
  "transition-colors group",
  {
    variants: {
      variant: {
        default: "hover:bg-[#f2e8f5]/30",
        purple: "hover:bg-[#f2e8f5]/20",
        striped: "even:bg-gray-50 hover:bg-[#f2e8f5]/30",
        minimal: "hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

// Table cell variants
export const tableCellVariants = cva(
  "px-4 py-3 text-gray-800",
  {
    variants: {
      align: {
        right: "text-right",
        left: "text-left",
        center: "text-center",
      },
      emphasis: {
        normal: "",
        medium: "font-medium",
        bold: "font-semibold",
      },
      truncate: {
        none: "",
        truncate: "truncate max-w-xs",
        wrap: "whitespace-normal",
        nowrap: "whitespace-nowrap",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      align: "right",
      emphasis: "normal",
      truncate: "none",
      size: "md",
    }
  }
);

// Button cell variants
export const actionCellVariants = cva(
  "px-4 py-3 whitespace-nowrap",
  {
    variants: {
      align: {
        right: "text-right",
        left: "text-left",
        center: "text-center",
      },
    },
    defaultVariants: {
      align: "center",
    }
  }
);

// Pagination container
export const paginationContainerVariants = cva(
  "flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6",
  {
    variants: {
      variant: {
        default: "",
        minimal: "bg-transparent border-t-0",
        purple: "bg-[#f2e8f5]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

// Helper functions to get the appropriate classes
export function getListContainerClass(variant = "default", size = "md", className = "") {
  return `${listContainerVariants({ variant: variant as any, size: size as any })} ${className}`;
}

export function getTableClass(variant = "default", size = "md", className = "") {
  return `${tableVariants({ variant: variant as any, size: size as any })} ${className}`;
}

export function getHeaderRowClass(variant = "default", className = "") {
  return `${tableHeaderRowVariants({ variant: variant as any })} ${className}`;
}

export function getHeaderCellClass(variant = "default", size = "md", className = "") {
  return `${tableHeaderCellVariants({ variant: variant as any, size: size as any })} ${className}`;
}

export function getRowClass(variant = "default", className = "") {
  return `${tableRowVariants({ variant: variant as any })} ${className}`;
}

export function getCellClass({
  align = "right",
  emphasis = "normal",
  truncate = "none",
  size = "md",
  className = "",
}) {
  return `${tableCellVariants({ 
    align: align as any, 
    emphasis: emphasis as any, 
    truncate: truncate as any,
    size: size as any
  })} ${className}`;
}

export function getActionCellClass(align = "center", className = "") {
  return `${actionCellVariants({ align: align as any })} ${className}`;
}

export function getPaginationContainerClass(variant = "default", className = "") {
  return `${paginationContainerVariants({ variant: variant as any })} ${className}`;
}