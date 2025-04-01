"use client";

import React, { useState } from 'react';
import Header from "./headers/header";
import Body from "./body/body";
import EditSection from "./edit/editSection";
import UpdatedQueryBuilderSection from "./query/updatedQueryBuilderSection";
import List from "../components/list/List";
import EventDataFetcher from "../services/EventDataFetcher";
import { 
  IColumn, 
  IActionButton, 
  IExtendedEvent
} from "../../types/interfaces/events/IEvents";
import { IQuery, FilterType } from '../../types/queries/IQueryBuilder';

// Set the page title
const title = 'איתור מופעים';

// Create an instance of the event data fetcher
const eventDataFetcher = new EventDataFetcher();

// Define sample field definitions for display
const allFields = [
  { value: 'name', label: 'שם אירוע', type: 'text' as FilterType },
  { value: 'department', label: 'מחלקה', type: 'select' as FilterType },
  { value: 'hall', label: 'אולם', type: 'select' as FilterType },
  { value: 'date', label: 'תאריך', type: 'date' as FilterType },
  { value: 'available', label: 'כרטיסים זמינים', type: 'number' as FilterType },
  { value: 'price', label: 'מחיר', type: 'number' as FilterType },
  { value: 'status', label: 'סטטוס', type: 'select' as FilterType }
];

// Define the columns for our events table
const columns: IColumn[] = [
  {
    id: 'id',
    header: 'מס"ד',
    accessor: 'id',
    align: 'center',
    isSortable: true
  },
  {
    id: 'department',
    header: 'מחלקה',
    accessor: 'department',
    isSortable: true
  },
  {
    id: 'name',
    header: 'שם',
    accessor: 'name',
    isSortable: true,
    cellRenderer: (value, item) => (
      <div className="font-medium text-[#4e165a]">{value}</div>
    )
  },
  {
    id: 'date',
    header: 'תאריך',
    accessor: 'date',
    align: 'center',
    isSortable: true
  },
  {
    id: 'hall',
    header: 'אולם',
    accessor: 'hall',
    isSortable: true
  },
  {
    id: 'forSale',
    header: 'למכירה',
    accessor: 'forSale',
    align: 'center',
    isSortable: true
  },
  {
    id: 'sold',
    header: 'נמכרו',
    accessor: 'sold',
    align: 'center',
    isSortable: true
  },
  {
    id: 'reserved',
    header: 'משוריינים',
    accessor: 'reserved',
    align: 'center',
    isSortable: true
  },
  {
    id: 'available',
    header: 'פנויים',
    accessor: 'available',
    align: 'center',
    isSortable: true,
    cellRenderer: (value, item) => {
      // Highlight availability with color coding
      let colorClass = 'bg-green-100 text-green-800';
      if (value === 0) {
        colorClass = 'bg-red-100 text-red-800';
      } else if (value < 20) {
        colorClass = 'bg-amber-100 text-amber-800';
      }
      
      return (
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {value}
        </div>
      );
    }
  }
];

// Define the action buttons
const actionButtons: IActionButton[] = [
  {
    id: 'order',
    label: 'הזמן',
    variant: 'primary',
    onClick: (item) => {
      // In a real app, this would open a reservation modal or navigate to order page
      alert(`הזמנת כרטיסים למופע: ${item.name}`);
    },
    // Disable the button if no tickets are available
    isDisabled: (item) => item.available === 0
  },
  {
    id: 'view',
    label: 'פרטים',
    variant: 'ghost',
    onClick: (item) => {
      // In a real app, this would open a details modal or navigate to details page
      alert(`צפייה בפרטי המופע: ${item.name}`);
    }
  }
];

export default function Home() {
  // State for managing the selected event (for potential modal or details view)
  const [selectedEvent, setSelectedEvent] = useState<IExtendedEvent | null>(null);
  
  // State for controlling EditSection visibility
  const [isEditSectionVisible, setIsEditSectionVisible] = useState(false);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for search parameters
  const [searchParams, setSearchParams] = useState<any>({});
  
  // State for initial load indicator
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // State for refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Handle row click to view event details
  const handleRowClick = (event: IExtendedEvent) => {
    setSelectedEvent(event);
    console.log("Selected event:", event);
  };

  // Function to handle advanced button click from the header
  const handleAdvancedClick = () => {
    setIsEditSectionVisible(!isEditSectionVisible);
  };
  
  // Helper function to create display text for a condition
  const getDisplayTextForCondition = (condition: any) => {
    const field = allFields.find(f => f.value === condition.field);
    const fieldLabel = field?.label || condition.field;
    
    let opText = '';
    switch (condition.operator) {
      case 'equals': opText = 'שווה ל'; break;
      case 'notEquals': opText = 'לא שווה ל'; break;
      case 'contains': opText = 'מכיל'; break;
      case 'startsWith': opText = 'מתחיל ב'; break;
      case 'endsWith': opText = 'מסתיים ב'; break;
      case 'greaterThan': opText = 'גדול מ'; break;
      case 'lessThan': opText = 'קטן מ'; break;
      case 'between': opText = 'בין'; break;
      case 'in': opText = 'אחד מ'; break;
      case 'notIn': opText = 'לא אחד מ'; break;
    }
    
    const valueText = Array.isArray(condition.value) 
      ? condition.value.join(', ') 
      : String(condition.value || '');
    
    return condition.negated 
      ? `${fieldLabel} לא ${opText} ${valueText}`
      : `${fieldLabel} ${opText} ${valueText}`;
  };
  
  // Function to handle search from query builder
  const handleSearch = (query: IQuery) => {
    console.log('Searching with query:', query);
    setIsInitialLoad(false);
    
    // Convert the query to search parameters
    if (query.rootGroup.conditions.length > 0) {
      const firstCondition = query.rootGroup.conditions[0];
      const params = {
        field: firstCondition.field,
        operator: firstCondition.operator,
        value: firstCondition.value,
        negated: firstCondition.negated
      };
      
      // Store the parameters for the data fetcher
      setSearchParams(params);
      
      // Store a display text for the user
      const displayText = firstCondition.field 
        ? getDisplayTextForCondition(firstCondition)
        : "מסנן מורכב";
      
      setSearchQuery(displayText);
    } else if (query.rootGroup.groups.length > 0) {
      // For complex queries with nested groups
      setSearchQuery("מסנן מורכב");
      setSearchParams({
        complexQuery: query
      });
    } else {
      // Empty query
      setSearchQuery('');
      setSearchParams({});
    }
    
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mr-[25%]">
      {/* Header with the advanced button handler */}
      <Header 
        title={title} 
        className="header" 
        onAdvancedButtonClick={handleAdvancedClick}
      />
      
      {/* EditSection positioned between header and body */}
      <div className="container mx-auto px-4">
        <EditSection 
          isVisible={isEditSectionVisible}
          onClose={() => setIsEditSectionVisible(false)}
          onSearch={handleSearch}
          className="mt-4"
        >
          <UpdatedQueryBuilderSection 
            onSearch={handleSearch}
            onClose={() => setIsEditSectionVisible(false)}
          />
        </EditSection>
      </div>
      
      {/* Main content body */}
      <Body>
        <div className="max-w-7xl mx-auto my-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#4e165a]">רשימת מופעים זמינים</h2>
              
              {/* Display active search query if any */}
              {searchQuery && (
                <div className="flex items-center px-3 py-1.5 bg-[#f2e8f5]/50 text-[#4e165a] rounded-md">
                  <span className="text-sm">סינון פעיל: {searchQuery}</span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchParams({});
                      setIsInitialLoad(true);
                      setRefreshTrigger(prev => prev + 1);
                    }}
                    className="mr-2 p-1 text-[#4e165a]/70 hover:text-[#4e165a] rounded-full"
                    aria-label="נקה סינון"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Events list component */}
            <List
              columns={columns}
              dataFetcher={eventDataFetcher}
              actionButtons={actionButtons}
              showPagination={true}
              itemsPerPage={10}
              defaultSortColumn="date"
              defaultSortDirection="asc"
              onRowClick={handleRowClick}
              variant="default"
              size="md"
              emptyStateMessage={isInitialLoad ? "בנה שאילתא להצגת אירועים" : "לא נמצאו מופעים להצגה"}
              initialSearchQuery={searchQuery}
              searchParams={searchParams}
              refreshTrigger={refreshTrigger}
              isInitialLoad={isInitialLoad}
            />
          </div>
        </div>
      </Body>
    </div>
  );
}