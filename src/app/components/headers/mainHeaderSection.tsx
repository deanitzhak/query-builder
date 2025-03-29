// src/app/components/headers/mainHeaderSection.tsx
import React, { useState, useEffect } from "react";
import type { IHeaderSection } from "../../../types/interfaces/layout/IHeader";
import '../../style/header.css';
import { getHeaderConfig } from "../../services/loadButtonSerivce";
import ButtonFactory from "../../factory/buttonFactory";
import { initializeButtonRegistry, getRegisteredButtonTypes } from "../../patterns/registration/buttonRegistry";
import type { ButtonConfig } from "../../factory/buttonFactory";

// Initialize the button registry only once (module level variable)
let buttonRegistryInitialized = false;

export default function MainHeaderSection({ title = "Default Section Title", subtitle, className = "" }: IHeaderSection) {
    const [components, setComponents] = useState<ButtonConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>({
        start: null,
        end: null
    });
    const [registeredButtons, setRegisteredButtons] = useState<string[]>([]);

    useEffect(() => {
        // Initialize button registry only once
        if (!buttonRegistryInitialized) {
            initializeButtonRegistry();
            buttonRegistryInitialized = true;
        }
        
        // Get a list of all registered button types for debugging/monitoring
        setRegisteredButtons(getRegisteredButtonTypes());
        console.log('Registered button types:', getRegisteredButtonTypes());
        
        async function loadHeaderComponents() {
            try {
                setIsLoading(true);
                // Get configuration from service
                const config = await getHeaderConfig();
                setComponents(config);
                setError(null);
                console.log('Loaded components:', config);
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
    
    return (
        <div className={`${className} main_header_section`}>
            <div className="absolute top-4 left-4 flex flex-row gap-[10px] justify-start">
                {isLoading ? (
                    <div className="text-sm text-gray-500">טוען כלים...</div>
                ) : error ? (
                    <div className="text-sm text-red-500">{error}</div>
                ) : (
                    <>
                        {components.map((component, index) => (
                            <ButtonFactory
                                key={`button-factory-${index}`}
                                config={component}
                                onAction={handleAction}
                                onDateChange={handleDateChange}
                                className="add-button-header"
                                index={index}
                            />
                        ))}
                    </>
                )}
            </div>
            
            {/* Debug panel */}
            <div className="fixed bottom-2 right-2 text-xs text-gray-500 bg-white/70 p-2 rounded shadow-sm">
                <div>Registered buttons: {registeredButtons.join(', ') || 'None'}</div>
                <div>Component count: {components.length}</div>
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