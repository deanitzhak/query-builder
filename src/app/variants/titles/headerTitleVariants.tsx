import { cva } from 'class-variance-authority';

export const headerTitleVariants = cva(
  "box-border flex gap-2 flex-1 justify-end rtl",
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-xl",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const headerTitleTextVariants = cva("text-right w-full");