// src/components/list/ListItem.tsx
import React from 'react';
import { IListItemProps } from '../../../types/interfaces/events/IEvents';

import { getRowClass, getCellClass, getActionCellClass } from '../../variants/listTheme';
import { getButtonStyle, ButtonVariant } from '../../variants/buttonThemes';

const ListItem: React.FC<IListItemProps> = ({
  item,
  columns,
  actionButtons = [],
  isSelected = false,
  onClick,
  variant = 'default',
  size = 'md'
}) => {
  // Handle the row click if provided
  const handleRowClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  // Get the cell value based on the accessor (string or function)
  const getCellValue = (column: any) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return item[column.accessor];
  };

  return (
    <tr 
      className={`
        ${getRowClass(variant)}
        ${isSelected ? 'bg-[#f2e8f5]/40' : ''}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={handleRowClick}
    >
      {columns.map(column => {
        // Get the value for this cell
        const value = getCellValue(column);
        
        // Determine cell alignment
        const align = column.align || 'right';
        
        // Determine if we should use a custom renderer
        const content = column.cellRenderer 
          ? column.cellRenderer(value, item)
          : value;
          
        return (
          <td 
            key={column.id} 
            className={getCellClass({
              align,
              size,
              // Special styling for specific columns
              emphasis: column.id === 'name' ? 'medium' : 'normal',
              truncate: column.id === 'name' ? 'truncate' : 'nowrap',
              className: column.className || ''
            })}
          >
            {content}
          </td>
        );
      })}
      
      {/* Action buttons column if any are provided */}
      {actionButtons && actionButtons.length > 0 && (
        <td className={getActionCellClass()}>
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            {actionButtons.map(button => {
              // Check if the button should be shown for this item
              const shouldShow = button.showCondition ? button.showCondition(item) : true;
              if (!shouldShow) return null;
              
              // Check if the button should be disabled for this item
              const isDisabled = button.isDisabled ? button.isDisabled(item) : false;
              
              return (
                <button
                  key={button.id}
                  className={getButtonStyle(
                    (button.variant || 'primary') as ButtonVariant, 
                    'sm' as any
                  )}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    button.onClick(item);
                  }}
                  disabled={isDisabled}
                >
                  {button.icon && (
                    <span className="button-icon flex-shrink-0 ml-1">{button.icon}</span>
                  )}
                  {button.label}
                </button>
              );
            })}
          </div>
        </td>
      )}
    </tr>
  );
};

export default ListItem;