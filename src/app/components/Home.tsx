"use client";

import React, { useState } from 'react';
import Header from "./headers/header";


import Body from "./body/body";
import List from "./list/List";
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
  
  // Handle row click to view event details
  const handleRowClick = (event: IExtendedEvent) => {
    setSelectedEvent(event);
    // In a real app, this might open a modal or navigate to a details page
    console.log("Selected event:", event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Header component */}
      <Header title={title} className='header' />
      
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
      
      {/* You could add a modal component here for showing event details */}
      {/* For example:
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
      */}
    </div>
  );
  }