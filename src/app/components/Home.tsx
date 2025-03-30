"use client";

import React, { useState } from 'react';
import Header from "./headers/header";
import Body from "./body/body";
import EditSection from "./edit/editSection";
import List from "../components/list/List";
import EventDataFetcher from "../services/EventDataFetcher";
import { 
  IColumn, 
  IActionButton, 
  IExtendedEvent 
} from "../../types/interfaces/events/IEvents";

// Set the page title
const title = 'איתור מופעים';

// Create an instance of the event data fetcher
const eventDataFetcher = new EventDataFetcher();

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
  
  // Handle row click to view event details
  const handleRowClick = (event: IExtendedEvent) => {
    setSelectedEvent(event);
    // In a real app, this might open a modal or navigate to a details page
    console.log("Selected event:", event);
  };

  // Function to handle advanced button click from the header
  const handleAdvancedClick = () => {
    setIsEditSectionVisible(!isEditSectionVisible);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 items-center mr-[25%]">
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
          className="mt-4"
        >
          {/* This can be your simple form or any content */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#4e165a]">חיפוש מתקדם</h3>
            
            <button 
              onClick={() => setIsEditSectionVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4">
            {/* Your form will go here */}
            <p>תוכן החיפוש המתקדם יופיע כאן</p>
          </div>
        </EditSection>
      </div>
      
      {/* Main content body */}
      <Body>
        <div className="max-w-7xl mx-auto my-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-[#4e165a] mb-6">רשימת מופעים זמינים</h2>
            
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
              emptyStateMessage="לא נמצאו מופעים להצגה"
            />
          </div>
        </div>
      </Body>
    </div>
  );
}