// UI component props

export interface HeaderTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg'; 
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Add more UI-related interfaces as needed