import React, { useState, useEffect } from "react";
import type { IHeaderSection } from "../../../types/interfaces/layout/IHeader";
import '../../style/header.css';
import AddButton from "../button/addButton";
import InputButton from "../button/inputButton";
import DateSelector from "../button/dateSelector";
import { getHeaderConfig } from "../button/services/loadButtonSerivce";

// Define types for our button configurations
interface ButtonConfig {
  type: 'button' | 'input' | 'date';
  label: string;
  icon: string;
  action: string; // Action identifier
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function MainHeaderSection({ title = "Default Section Title", subtitle, className = "" }: IHeaderSection) {
    const [components, setComponents] = useState<ButtonConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>({
        start: null,
        end: null
    });

    useEffect(() => {
        async function loadHeaderComponents() {
            try {
                setIsLoading(true);
                // Get configuration from service
                const config = await getHeaderConfig();
                setComponents(config);
                setError(null);
            } catch (err) {
                console.error("Failed to load header configuration", err);
                setError("Failed to load header tools");
                // Fallback to default components if API fails
                setComponents(getDefaultComponents());
            } finally {
                setIsLoading(false);
            }
        }

        loadHeaderComponents();
    }, []);

    // Handle button clicks
    const handleAction = (action: string) => {
        console.log(`Action triggered: ${action}`);
        
        // Map actions to functions
        const actionMap: Record<string, () => void> = {
            'search': () => { console.log('Performing search'); },
            'sort': () => { console.log('Performing sort'); },
            'dateFilter': () => { 
                console.log('Date filter', dateRange);
            },
            'advanced': () => { console.log('Opening advanced options'); },
            'batchActions': () => { console.log('Opening batch actions menu'); },
            'reports': () => { console.log('Opening reports menu'); },
        };
        
        // Execute the action if it exists
        if (actionMap[action]) {
            actionMap[action]();
        } else {
            console.warn(`Unknown action: ${action}`);
        }
    };

    // Handler for date changes
    const handleDateChange = (start: string | null, end: string | null) => {
        setDateRange({ start, end });
        console.log(`Date range updated: ${start} to ${end}`);
    };

    // Render each component based on its type
    const renderComponent = (component: ButtonConfig, index: number) => {
        const key = `${component.type}-${index}`;
        
        if (component.type === 'input') {
            return (
                <InputButton 
                    key={key}
                    label={component.label} 
                    icon={component.icon} 
                    onClick={() => handleAction(component.action)} 
                    className="add-button-header"
                    variant={component.variant || "primary"}
                />
            );
        } else if (component.type === 'date') {
            return (
                <DateSelector
                    key={key}
                    label={component.label}
                    icon={component.icon}
                    onChange={handleDateChange}
                    className="date-selector-header"
                    variant={component.variant || "primary"}
                />
            );
        }
        
        return (
            <AddButton 
                key={key}
                label={component.label} 
                icon={component.icon} 
                onClick={() => handleAction(component.action)} 
                className="add-button-header"
                variant={component.variant || "primary"}
            />
        );
    };
    
    return (
        <div className={`${className} main_header_section`}>
            <div className="absolute top-4 left-4 flex flex-row gap-[10px] justify-start">
                {isLoading ? (
                    <div className="text-sm text-gray-500">טוען כלים...</div>
                ) : error ? (
                    <div className="text-sm text-red-500">{error}</div>
                ) : (
                    components.map(renderComponent)
                )}
            </div>
        </div>
    );
}

function getDefaultComponents(): ButtonConfig[] {
    return [
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
            label: 'מתקדם',
            icon: '+',
            action: 'advanced',
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
        }
    ];
}