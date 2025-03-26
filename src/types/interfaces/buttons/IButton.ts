
export interface AddButtonProps {
    label: string;
    onClick: () => void;
    icon: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md' | 'lg'; 
    disabled?: boolean;
    fullWidth?: boolean;
}