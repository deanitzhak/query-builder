// src/components/query/FilterGroup.tsx
import React from 'react';
import { IFilterGroupProps, LogicalOperator } from '../../../types/queries/IQueryBuilder';
import FilterCondition from '../../query/filterCondition';

const FilterGroup: React.FC<IFilterGroupProps> = ({
  group,
  level = 0,
  onUpdateGroup,
  onAddCondition,
  onAddGroup,
  onRemoveGroup,
  onUpdateCondition,
  onRemoveCondition,
  availableFields,
  fieldCategories
}) => {
  // Generate background color based on nesting level for visual distinction
  const getBgColor = () => {
    const colors = [
      'bg-[#f2e8f5]/20',
      'bg-[#f2e8f5]/30',
      'bg-[#f2e8f5]/40',
      'bg-[#f2e8f5]/50'
    ];
    return colors[level % colors.length];
  };

  // Handler to toggle between AND/OR for a specific index
  const toggleOperator = (index: number) => {
    // Create a copy of the current operators
    const updatedOperators = [...(group.childOperators || [])];
    
    // Toggle the operator at this index
    updatedOperators[index] = updatedOperators[index] === 'AND' ? 'OR' : 'AND';
    
    // Update the group
    onUpdateGroup(group.id, { childOperators: updatedOperators });
  };

  // Toggle the main operator for this group
  const toggleMainOperator = () => {
    onUpdateGroup(group.id, { 
      operator: group.operator === 'AND' ? 'OR' : 'AND' 
    });
  };

  // Ensure we have operators for all children - fixed to prevent negative array length
  const totalItems = group.conditions.length + group.groups.length;
  const operators = group.childOperators || 
    (totalItems <= 1 ? [] : Array(totalItems - 1).fill(group.operator || 'AND'));

  // Create a unified items array to maintain proper ordering
  type ItemType = 
    | { type: 'condition'; data: IFilterGroupProps['group']['conditions'][0]; index: number }
    | { type: 'group'; data: IFilterGroupProps['group']['groups'][0]; index: number };

  const items: ItemType[] = [
    ...group.conditions.map((condition, i) => ({ 
      type: 'condition' as const, 
      data: condition, 
      index: i 
    })),
    ...group.groups.map((childGroup, i) => ({ 
      type: 'group' as const, 
      data: childGroup, 
      index: i 
    }))
  ].sort((a, b) => {
    // Sort by index for now, could be extended to support explicit position
    return a.index - b.index;
  });

  return (
    <div className={`p-3 border-2 ${level === 0 ? 'border-[#4e165a]/40' : 'border-[#ad7eba]/20'} rounded-md ${getBgColor()} mb-3`}>
      {/* Group header with controls */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ad7eba]/20">
        <div className="flex items-center">
          {/* Group label with level indicator */}
          <div className={`rounded-md px-2 py-1 text-sm font-medium ${level === 0 ? 'bg-[#4e165a] text-white' : 'bg-white text-[#4e165a] border border-[#ad7eba]/40'}`}>
            {level === 0 ? 'שאילתא ראשית' : `תת-שאילתא ${level}`}
          </div>
          
          {/* Main operator control - visible if there's more than one item */}
          {totalItems > 1 && (
            <div className="flex items-center mx-3 bg-white px-3 py-1 rounded-full border border-[#ad7eba]/30">
              <span className="text-xs text-gray-500 mr-1">חבר עם:</span>
              <button
                onClick={toggleMainOperator}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  group.operator === 'AND' 
                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
                type="button"
              >
                {group.operator === 'AND' ? 'וגם (AND)' : 'או (OR)'}
              </button>
            </div>
          )}
          
          {/* NOT operator toggle */}
          <button
            onClick={() => onUpdateGroup(group.id, { negated: !group.negated })}
            className={`ml-2 px-2 py-0.5 text-xs rounded-md ${
              group.negated 
                ? 'bg-red-100 text-red-800 border border-red-200' 
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
            }`}
            type="button"
          >
            {group.negated ? 'NOT (הפוך)' : 'NOT'}
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Add condition button */}
          <button
            onClick={() => onAddCondition(group.id)}
            className="p-1 text-[#4e165a] hover:text-[#7a3b88] bg-white rounded-md border border-[#ad7eba]/30 flex items-center"
            title="הוסף תנאי"
            type="button"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs">תנאי</span>
          </button>
          
          {/* Add group button */}
          <button
            onClick={() => onAddGroup(group.id)}
            className="p-1 text-[#4e165a] hover:text-[#7a3b88] bg-white rounded-md border border-[#ad7eba]/30 flex items-center"
            title="הוסף קבוצה חדשה"
            type="button"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs">תת-שאילתא</span>
          </button>
          
          {/* Remove group button - don't show for root group (level 0) */}
          {level > 0 && (
            <button
              onClick={() => onRemoveGroup(group.id)}
              className="p-1 text-gray-500 hover:text-red-500 bg-white rounded-md border border-gray-200 flex items-center"
              title="הסר קבוצה"
              type="button"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-xs">הסר</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Conditions and nested groups container - keeps hierarchy visually connected */}
      <div className="space-y-2 pr-2 border-r-2 border-[#f2e8f5]">
        {items.map((item, idx, arr) => (
          <React.Fragment key={item.data.id}>
            {/* Render the actual condition or group */}
            <div className="relative">
              {/* Connection line to visually show hierarchy */}
              {idx > 0 && (
                <div className="absolute -top-3 -right-2 w-2 h-3 border-r-2 border-t-2 border-[#f2e8f5] rounded-tr-md"></div>
              )}

              {item.type === 'condition' ? (
                <FilterCondition
                  condition={item.data}
                  onUpdate={onUpdateCondition}
                  onRemove={onRemoveCondition}
                  availableFields={availableFields}
                  fieldCategories={fieldCategories}
                />
              ) : (
                <FilterGroup
                  group={item.data}
                  level={level + 1}
                  onUpdateGroup={onUpdateGroup}
                  onAddCondition={onAddCondition}
                  onAddGroup={onAddGroup}
                  onRemoveGroup={onRemoveGroup}
                  onUpdateCondition={onUpdateCondition}
                  onRemoveCondition={onRemoveCondition}
                  availableFields={availableFields}
                  fieldCategories={fieldCategories}
                />
              )}
            </div>
            
            {/* Show an editable operator between items */}
            {idx < arr.length - 1 && (
              <div className="flex justify-end my-2 mr-4 relative">
                <button
                  onClick={() => toggleOperator(idx)}
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${operators[idx] === 'AND' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                    }`}
                  type="button"
                >
                  {operators[idx] === 'AND' ? 'וגם (AND)' : 'או (OR)'}
                </button>
                {/* Connection line */}
                <div className="absolute -right-2 top-1/2 w-2 h-px border-b-2 border-[#f2e8f5]"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Empty state message when no conditions or groups */}
      {group.conditions.length === 0 && group.groups.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm border border-dashed border-gray-300 rounded-md bg-white">
          קבוצה ריקה - הוסף תנאים או תת-שאילתות
        </div>
      )}
    </div>
  );
};

export default FilterGroup;