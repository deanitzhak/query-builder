export interface HeaderTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

export interface IHeaderBreadcrumb {
    path: string;
    label: string;
    isActive?: boolean;
}

export interface IHeaderActions {
    id: string;
    label: string;
    icon?: string;
    onClick: () => void;
}

export interface IHeaderSection {
    title: string;
    subtitle?: string;
    breadcrumbs?: IHeaderBreadcrumb[];
    className?: string;
    actions?: IHeaderActions[];
}

export interface ButtonConfig {
    type: 'button' | 'input' | 'date';
    label: string;
    icon: string;
    action: string; // Action identifier
    variant?: 'primary' | 'secondary' | 'tertiary';
}