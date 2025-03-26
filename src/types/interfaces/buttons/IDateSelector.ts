export interface DateSelectorProps {
    label: string;
    icon?: string;
    onChange: (startDate: string | null, endDate: string | null) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    startPlaceholder?: string;
    endPlaceholder?: string;
}