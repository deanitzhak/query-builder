// src/components/list/ListBody.tsx
import React from 'react';
import { IListBodyProps } from '../../../types/interfaces/events/IEvents';
import ListItem from './ListItem';

const ListBody: React.FC<IListBodyProps> = ({
  items,
  columns,
  actionButtons,
  isLoading = false,
  emptyStateMessage = "אין נתונים להצגה",
  onRowClick,
  variant = 'default',
  size = 'md'
}) => {
  // For loading state, return a row with a single cell containing the loading indicator
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + (actionButtons && actionButtons.length > 0 ? 1 : 0)}>
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4e165a]"></div>
                <p className="text-gray-500 text-sm">טוען נתונים...</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  // For empty state, return a row with a single cell containing the empty message
  if (!items || items.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + (actionButtons && actionButtons.length > 0 ? 1 : 0)}>
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">{emptyStateMessage}</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  // Normal state with items
  return (
    <tbody>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          columns={columns}
          actionButtons={actionButtons}
          onClick={onRowClick}
          variant={variant}
          size={size}
        />
      ))}
    </tbody>
  );
};

export default ListBody;