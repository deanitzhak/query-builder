// src/components/list/ListHeader.tsx
import React from 'react';
import { IListHeaderProps } from '../../../types/interfaces/events/IEvents';
import { getHeaderRowClass, getHeaderCellClass } from '../../variants/listTheme';

const ListHeader: React.FC<IListHeaderProps> = ({
  columns,
  sortState,
  onSort,
  variant = 'default',
  size = 'md'
}) => {
  // Render sort indicator based on current sort state
  const renderSortIndicator = (columnId: string) => {
    if (sortState.column !== columnId) {
      return (
        <svg className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      );
    }

    if (sortState.direction === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7 14l5-5 5 5z" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7 10l5 5 5-5z" />
      </svg>
    );
  };

  return (
    <thead className={getHeaderRowClass(variant)}>
      <tr>
        {columns.map(column => (
          <th 
            key={column.id}
            className={`
              ${getHeaderCellClass(variant, size)}
              ${column.align === 'center' ? 'text-center' : ''}
              ${column.align === 'left' ? 'text-left' : ''}
              ${column.isSortable ? 'cursor-pointer group' : ''}
              ${column.className || ''}
            `}
            onClick={() => column.isSortable && onSort(column.id)}
          >
            <div className="flex items-center justify-end">
              {column.align !== 'right' && column.isSortable && renderSortIndicator(column.id)}
              <span>{column.header}</span>
              {column.align === 'right' && column.isSortable && renderSortIndicator(column.id)}
            </div>
          </th>
        ))}
        
        {/* Add an extra header cell for action buttons column if needed */}
        <th className={getHeaderCellClass(variant, size, 'text-center')}>
          פעולות
        </th>
      </tr>
    </thead>
  );
};

export default ListHeader;