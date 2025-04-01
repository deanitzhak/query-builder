// src/components/query/filterCondition.tsx
import React, { useEffect } from 'react';
import { 
  IFilterCondition, 
  IFilterConditionProps, 
  FilterOperator, 
  FilterType,
  IFieldDefinition
} from '../../types/queries/IQueryBuilder';
import { getInputStyle } from '../variants/buttonThemes';

// Map filter types to available operators
const operatorsByType: Record<FilterType, FilterOperator[]> = {
  text: ['equals', 'notEquals', 'contains', 'startsWith', 'endsWith'],
  number: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'],
  date: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'],
  select: ['equals', 'notEquals', 'in'],
  multiSelect: ['in', 'notIn'],
  boolean: ['equals']
};

// Human-readable operator labels
const operatorLabels: Record<FilterOperator, string> = {
  equals: 'שווה',
  notEquals: 'לא שווה',
  contains: 'מכיל',
  startsWith: 'מתחיל ב',
  endsWith: 'מסתיים ב',
  greaterThan: 'גדול מ',
  lessThan: 'קטן מ',
  between: 'בין',
  in: 'נמצא בתוך',
  notIn: 'לא נמצא בתוך'
};

const FilterCondition: React.FC<IFilterConditionProps> = ({
  condition,
  onUpdate,
  onRemove,
  availableFields,
  fieldCategories
}) => {
  // Find the current field definition based on selected field value
  const currentField = availableFields.find(f => f.value === condition.field);
  
  // When field changes, update the condition type and operator based on the field
  useEffect(() => {
    if (currentField && currentField.type !== condition.type) {
      // Get the appropriate operator for the new type
      const validOperators = operatorsByType[currentField.type] || [];
      const newOperator = validOperators.length > 0 ? validOperators[0] : 'equals';
      
      // Get default value based on field type
      let defaultValue;
      switch (currentField.type) {
        case 'boolean':
          defaultValue = false;
          break;
        case 'multiSelect':
          defaultValue = [];
          break;
        case 'date':
          defaultValue = '';
          break;
        case 'number':
          defaultValue = 0;
          break;
        default:
          defaultValue = '';
      }
      
      // Update the condition with new type, operator and default value
      onUpdate(condition.id, {
        type: currentField.type,
        operator: newOperator,
        value: defaultValue
      });
    }
  }, [condition.field, currentField, condition.id, onUpdate, condition.type]);
  
  // Get available operators for the current field type
  const availableOperators = operatorsByType[condition.type] || [];
  
  // Get current field options if it's a select or multiSelect
  const fieldOptions = currentField?.options || [];
  
  // Render input based on field type and operator
  const renderValueInput = () => {
    switch (condition.type) {
      case 'text':
        return (
          <input
            type="text"
            value={String(condition.value || '')}
            onChange={(e) => onUpdate(condition.id, { value: e.target.value })}
            className={getInputStyle({ size: 'sm' })}
            placeholder="הזן ערך"
          />
        );
        
      case 'number':
        if (condition.operator === 'between') {
          // Handle range for 'between' operator
          const [min, max] = Array.isArray(condition.value) ? condition.value : [0, 0];
          return (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={String(min || 0)}
                onChange={(e) => onUpdate(condition.id, { value: [parseFloat(e.target.value), max] })}
                className={getInputStyle({ size: 'sm', width: 'auto' })}
                placeholder="מינימום"
              />
              <span>עד</span>
              <input
                type="number"
                value={String(max || 0)}
                onChange={(e) => onUpdate(condition.id, { value: [min, parseFloat(e.target.value)] })}
                className={getInputStyle({ size: 'sm', width: 'auto' })}
                placeholder="מקסימום"
              />
            </div>
          );
        }
        return (
          <input
            type="number"
            value={String(condition.value ?? '')}
            onChange={(e) => onUpdate(condition.id, { value: parseFloat(e.target.value) })}
            className={getInputStyle({ size: 'sm' })}
            placeholder="הזן מספר"
          />
        );
        
      case 'date':
        if (condition.operator === 'between') {
          // Handle date range for 'between' operator
          const [startDate, endDate] = Array.isArray(condition.value) ? condition.value : ['', ''];
          return (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={String(startDate || '')}
                onChange={(e) => onUpdate(condition.id, { value: [e.target.value, endDate] })}
                className={getInputStyle({ size: 'sm', width: 'auto' })}
              />
              <span>עד</span>
              <input
                type="date"
                value={String(endDate || '')}
                onChange={(e) => onUpdate(condition.id, { value: [startDate, e.target.value] })}
                className={getInputStyle({ size: 'sm', width: 'auto' })}
              />
            </div>
          );
        }
        return (
          <input
            type="date"
            value={String(condition.value || '')}
            onChange={(e) => onUpdate(condition.id, { value: e.target.value })}
            className={getInputStyle({ size: 'sm' })}
          />
        );
        
      case 'select':
        return (
          <select
            value={String(condition.value || '')}
            onChange={(e) => onUpdate(condition.id, { value: e.target.value })}
            className={getInputStyle({ size: 'sm' })}
          >
            <option value="">בחר...</option>
            {fieldOptions.map(option => (
              <option key={option.value} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'multiSelect':
        return (
          <select
            multiple
            value={Array.isArray(condition.value) ? condition.value.map(String) : []}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
              onUpdate(condition.id, { value: values });
            }}
            className={getInputStyle({ size: 'sm' })}
            size={3}
          >
            {fieldOptions.map(option => (
              <option key={option.value} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'boolean':
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!condition.value}
              onChange={(e) => onUpdate(condition.id, { value: e.target.checked })}
              id={`boolean-${condition.id}`}
              className="h-4 w-4 text-[#4e165a] rounded border-gray-300 focus:ring-[#4e165a]/20"
            />
            <label htmlFor={`boolean-${condition.id}`}>
              {condition.value ? 'כן' : 'לא'}
            </label>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-gray-200 rounded-md">
      {/* Enhanced NOT toggle */}
      <div className="flex items-center">
        <button
          onClick={() => onUpdate(condition.id, { negated: !condition.negated })}
          className={`px-2 py-1 text-xs font-medium rounded ${
            condition.negated 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
          type="button"
        >
          {condition.negated ? 'לא (חיפוש הפוך)' : 'לא'}
        </button>
      </div>
      
      {/* Field selector with categories */}
      <select
        value={condition.field}
        onChange={(e) => onUpdate(condition.id, { field: e.target.value })}
        className={getInputStyle({ size: 'sm', width: 'auto' })}
      >
<option value="">בחר שדה...</option>
        {fieldCategories.map(category => (
          <optgroup key={category.id} label={category.name}>
            {category.fields.map(field => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      
      {/* Operator selector */}
      <select
        value={condition.operator}
        onChange={(e) => onUpdate(condition.id, { operator: e.target.value as FilterOperator })}
        className={getInputStyle({ size: 'sm', width: 'auto' })}
      >
        {availableOperators.map(op => (
          <option key={op} value={op}>
            {operatorLabels[op]}
          </option>
        ))}
      </select>
      
      {/* Value input based on type */}
      {renderValueInput()}
      
      {/* Remove button */}
      <button
        onClick={() => onRemove(condition.id)}
        className="p-1 text-gray-500 hover:text-red-500 rounded-full"
        aria-label="הסר תנאי"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default FilterCondition;            