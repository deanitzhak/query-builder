"use client";

import React, { useState } from 'react';
import Header from "./headers/header";

import List from './list/list';
import EventDataFetcher from '../services/EventDataFetcher';
import { IColumn, IActionButton, IExtendedEvent } from '../../types/interfaces/events/IEvents';


const title = 'איתור מופעים';

// Create an instance of the data fetcher
const eventDataFetcher = new EventDataFetcher();

// Define columns for the events table
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
      // Color-code availability status
      let bgColor = 'bg-green-100 text-green-800';
      if (value === 0) {
        bgColor = 'bg-red-100 text-red-800';
      } else if (value < 20) {
        bgColor = 'bg-amber-100 text-amber-800';
      }
      
      return (
        <div className={`rounded-full px-2 py-1 text-xs font-medium inline-block ${bgColor}`}>
          {value}
        </div>
      );
    }
  }
];

// Define action buttons
const actionButtons: IActionButton[] = [
  {
    id: 'order',
    label: 'הזמן',
    variant: 'primary',
    onClick: (item) => {
      alert(`הזמנת כרטיסים ל${item.name}`);
    },
    isDisabled: (item) => item.available === 0
  },
  {
    id: 'details',
    label: 'פרטים',
    variant: 'ghost',
    onClick: (item) => {
      alert(`צפייה בפרטי האירוע: ${item.name}`);
    }
  }
];

export default function EventsPage() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IExtendedEvent | null>(null);
  
  const handleRowClick = (event: IExtendedEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };
  
  return (
    <div className="page-wrapper min-h-screen bg-gray-50">
      <Header title={title} className='header' />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#4e165a] mb-6">רשימת מופעים זמינים</h2>
          
          <List
            columns={columns}
            dataFetcher={eventDataFetcher}
            actionButtons={actionButtons}
            showPagination={true}
            itemsPerPage={5}
            defaultSortColumn="date"
            defaultSortDirection="asc"
            onRowClick={handleRowClick}
            variant="default"
            size="md"
          />
        </div>
      </main>
      
      {/* Detail Modal - This is a simple implementation, you might want to create a separate modal component */}
      {isDetailModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 rtl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#4e165a]">{selectedEvent.name}</h3>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm text-gray-500">מחלקה</h4>
                <p>{selectedEvent.department}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">תאריך</h4>
                <p>{selectedEvent.date}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">אולם</h4>
                <p>{selectedEvent.hall}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">פנויים</h4>
                <p>{selectedEvent.available} מתוך {selectedEvent.forSale}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">משך</h4>
                <p>{selectedEvent.duration || 'לא צוין'}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">מחיר</h4>
                <p>{selectedEvent.price ? `₪${selectedEvent.price}` : 'לא צוין'}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button 
                onClick={() => setIsDetailModalOpen(false)} 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                סגור
              </button>
              <button 
                onClick={() => {
                  alert(`הזמנת כרטיסים ל${selectedEvent.name}`);
                  setIsDetailModalOpen(false);
                }}
                className="px-4 py-2 bg-[#4e165a] text-white rounded-md hover:bg-[#3a1043]"
                disabled={selectedEvent.available === 0}
              >
                הזמן כרטיסים
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}