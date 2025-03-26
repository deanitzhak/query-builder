import type { ButtonConfig } from "../../../../types/interfaces/layout/IHeader";

// Function to get header configuration (simulating API call)
export async function getHeaderConfig(): Promise<ButtonConfig[]> {
    // Simulate API request with a short delay (100ms instead of 1000ms)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    type: 'input',
                    label: 'חיפוש',
                    icon: '🔍',
                    action: 'search',
                    variant: 'primary'
                },
                {
                    type: 'input',
                    label: 'מיון',
                    icon: '🔍',
                    action: 'sort',
                    variant: 'primary'
                },
                {
                    type: 'date',
                    label: 'תאריכים',
                    icon: '📅',
                    action: 'dateFilter',
                    variant: 'primary'
                },
                {
                    type: 'button',
                    label: 'פעולות על מסומנים',
                    icon: '',
                    action: 'batchActions',
                    variant: 'primary'
                },
                {
                    type: 'button',
                    label: 'דוחות',
                    icon: '',
                    action: 'reports',
                    variant: 'primary'
                },
                {
                    type: 'button',
                    label: 'מתקדם',
                    icon: '+',
                    action: 'advanced',
                    variant: 'primary'
                }
        
            ]);
        }, 100); // Reduced from 1000ms to 100ms for faster loading
    });
}

// Function to get configuration based on entity type
export async function getHeaderConfigForEntity(entityType: string): Promise<ButtonConfig[]> {
    console.log(`Fetching config for entity: ${entityType}`);
    return getHeaderConfig(); // Use the generic config for now
}

// Function to get configuration based on user role
export async function getHeaderConfigForUserRole(role: string): Promise<ButtonConfig[]> {
    console.log(`Fetching config for role: ${role}`);
    return getHeaderConfig(); // Use the generic config for now
}