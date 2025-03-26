export interface InputBaseProps {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    className?: string;
    variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'disabled';
    size?: 'sm' | 'md' | 'lg';
    width?: 'auto' | 'full' | 'fixed';
}

export interface TextInputProps extends InputBaseProps {
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    autoComplete?: string;
}

export interface TextareaProps extends InputBaseProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    cols?: number;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface SelectProps extends InputBaseProps {
    value: string | string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    multiple?: boolean;
}

export interface CheckboxProps extends Omit<InputBaseProps, 'placeholder'> {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}