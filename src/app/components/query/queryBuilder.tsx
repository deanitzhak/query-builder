// src/components/query/queryBuilder.tsx
import React, { useState, useEffect } from 'react';
import { 
  IQueryBuilderProps, 
  IFilterCondition,
  IFilterGroup,
  IQuery,
  IQueryResult,
  IFieldDefinition,
  IFieldCategory
} from '../../../types/queries/IQueryBuilder';
import FilterGroup from './filterGroup';
import { generateUniqueId } from '../../../types/utils/idGenerator';
import { getInputStyle } from '../../variants/buttonThemes';

const QueryBuilder: React.FC<IQueryBuilderProps> = ({
  query,
  onQueryChange,
  availableFields,
  fieldCategories
}) => {
  const [queryResult, setQueryResult] = useState<IQueryResult>({
    queryString: '',
    humanReadable: '',
    params: {}
  });
  
  // State for showing JSON view
  const [showJsonView, setShowJsonView] = useState(false);
  
  // Find field by value across all categories
  const findField = (fieldValue: string): IFieldDefinition | undefined => {
    for (const category of fieldCategories) {
      const field = category.fields.find(f => f.value === fieldValue);
      if (field) return field;
    }
    return availableFields.find(f => f.value === fieldValue);
  };
  
  // Convert query to readable string and structured object
  const generateQueryResult = (query: IQuery): IQueryResult => {
    const params: Record<string, any> = {};
    let paramCounter = 1;
    
    // Generate string for a condition
    const getConditionString = (condition: IFilterCondition): string => {
      const field = condition.field;
      const operator = condition.operator;
      const value = condition.value;
      const paramName = `p${paramCounter++}`;
      
      // Find field definition
      const fieldDef = findField(field);
      const fieldLabel = fieldDef?.label || field;
      
      // Store parameter value
      params[paramName] = value;
      
      let opStr = '';
      switch (operator) {
        case 'equals':
          opStr = '=';
          break;
        case 'notEquals':
          opStr = '!=';
          break;
        case 'contains':
          opStr = 'LIKE';
          params[paramName] = `%${value}%`;
          break;
        case 'startsWith':
          opStr = 'LIKE';
          params[paramName] = `${value}%`;
          break;
        case 'endsWith':
          opStr = 'LIKE';
          params[paramName] = `%${value}`;
          break;
        case 'greaterThan':
          opStr = '>';
          break;
        case 'lessThan':
          opStr = '<';
          break;
        case 'between':
          opStr = 'BETWEEN';
          if (Array.isArray(value) && value.length === 2) {
            const paramName2 = `p${paramCounter++}`;
            params[paramName] = value[0];
            params[paramName2] = value[1];
            return condition.negated 
              ? `NOT (${fieldLabel} BETWEEN :${paramName} AND :${paramName2})`
              : `${fieldLabel} BETWEEN :${paramName} AND :${paramName2}`;
          }
          break;
        case 'in':
          opStr = 'IN';
          if (Array.isArray(value)) {
            const placeholders = value.map((_, i) => {
              const pName = `${paramName}_${i}`;
              params[pName] = value[i];
              return `:${pName}`;
            });
            return condition.negated 
              ? `${fieldLabel} NOT IN (${placeholders.join(', ')})`
              : `${fieldLabel} IN (${placeholders.join(', ')})`;
          }
          break;
        case 'notIn':
          opStr = 'NOT IN';
          if (Array.isArray(value)) {
            const placeholders = value.map((_, i) => {
              const pName = `${paramName}_${i}`;
              params[pName] = value[i];
              return `:${pName}`;
            });
            return `${fieldLabel} NOT IN (${placeholders.join(', ')})`;
          }
          break;
      }
      
      return condition.negated 
        ? `NOT (${fieldLabel} ${opStr} :${paramName})`
        : `${fieldLabel} ${opStr} :${paramName}`;
    };
    
    // Generate string for a group
    const getGroupString = (group: IFilterGroup): string => {
      const conditionStrings = group.conditions.map(getConditionString);
      const groupStrings = group.groups.map(getGroupString);
      const allStrings = [...conditionStrings, ...groupStrings].filter(Boolean);
      
      if (allStrings.length === 0) {
        return '';
      }
      
      const joinedString = allStrings.join(` ${group.operator} `);
      const groupString = allStrings.length > 1 ? `(${joinedString})` : joinedString;
      
      return group.negated ? `NOT ${groupString}` : groupString;
    };
    
    // Generate human-readable version
    const getHumanReadableCondition = (condition: IFilterCondition): string => {
      const fieldDef = findField(condition.field);
      const fieldLabel = fieldDef?.label || condition.field;
      
      let opLabel = '';
      switch (condition.operator) {
        case 'equals':
          opLabel = 'שווה ל';
          break;
        case 'notEquals':
          opLabel = 'לא שווה ל';
          break;
        case 'contains':
          opLabel = 'מכיל';
          break;
        case 'startsWith':
          opLabel = 'מתחיל ב';
          break;
        case 'endsWith':
          opLabel = 'מסתיים ב';
          break;
        case 'greaterThan':
          opLabel = 'גדול מ';
          break;
        case 'lessThan':
          opLabel = 'קטן מ';
          break;
        case 'between':
          opLabel = 'בין';
          break;
        case 'in':
          opLabel = 'נמצא בתוך';
          break;
        case 'notIn':
          opLabel = 'לא נמצא בתוך';
          break;
      }
      
      // Format the value based on type
      let valueStr = '';
      if (condition.type === 'boolean') {
        valueStr = condition.value ? 'כן' : 'לא';
      } else if (Array.isArray(condition.value)) {
        if (condition.operator === 'between' && condition.value.length === 2) {
          valueStr = `${condition.value[0]} ל ${condition.value[1]}`;
        } else {
          valueStr = condition.value.join(', ');
        }
      } else if (condition.type === 'select' || condition.type === 'multiSelect') {
        // Find the option label
        const field = findField(condition.field);
        if (field && field.options) {
          const option = field.options.find(o => o.value === condition.value);
          valueStr = option?.label || String(condition.value);
        } else {
          valueStr = String(condition.value);
        }
      } else {
        valueStr = String(condition.value);
      }
      
      return condition.negated 
        ? `${fieldLabel} לא ${opLabel} ${valueStr}`
        : `${fieldLabel} ${opLabel} ${valueStr}`;
    };
    
    const getHumanReadableGroup = (group: IFilterGroup): string => {
      const conditionStrings = group.conditions.map(getHumanReadableCondition);
      const groupStrings = group.groups.map(getHumanReadableGroup);
      const allStrings = [...conditionStrings, ...groupStrings].filter(Boolean);
      
      if (allStrings.length === 0) {
        return '';
      }
      
      const operator = group.operator === 'AND' ? 'וגם' : 'או';
      const joinedString = allStrings.join(` ${operator} `);
      const groupString = allStrings.length > 1 ? `(${joinedString})` : joinedString;
      
      return group.negated ? `לא ${groupString}` : groupString;
    };
    
    const queryString = getGroupString(query.rootGroup);
    const humanReadable = getHumanReadableGroup(query.rootGroup);
    
    return {
      queryString,
      humanReadable,
      params
    };
  };
  
  // Add a condition to a group
  const handleAddCondition = (groupId: string) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find the group to add to
    const findGroup = (group: IFilterGroup): boolean => {
      if (group.id === groupId) {
        // Get the first available field
        let defaultField: IFieldDefinition | undefined;
        
        // Try to get a field from the first category
        if (fieldCategories.length > 0 && fieldCategories[0].fields.length > 0) {
          defaultField = fieldCategories[0].fields[0];
        } else if (availableFields.length > 0) {
          defaultField = availableFields[0];
        }
        
        // If no field is found, use default values
        const fieldValue = defaultField?.value || '';
        const fieldType = defaultField?.type || 'text';
        
        const newCondition: IFilterCondition = {
          id: generateUniqueId(),
          field: fieldValue,
          operator: fieldType === 'text' ? 'contains' : 
                  fieldType === 'number' ? 'equals' :
                  fieldType === 'date' ? 'equals' :
                  fieldType === 'select' ? 'equals' :
                  fieldType === 'multiSelect' ? 'in' : 'equals',
          value: fieldType === 'boolean' ? false : 
                fieldType === 'multiSelect' ? [] : '',
          type: fieldType
        };
        
        // Add the new condition to the end of the conditions array
        group.conditions.push(newCondition);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findGroup(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findGroup(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Add a nested group
  const handleAddGroup = (parentId: string) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find the parent group
    const findGroup = (group: IFilterGroup): boolean => {
      if (group.id === parentId) {
        // Add a new empty group
        const newGroup: IFilterGroup = {
          id: generateUniqueId(),
          operator: 'AND',
          conditions: [],
          groups: []
        };
        
        // Add the new group to the end of the groups array
        group.groups.push(newGroup);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findGroup(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findGroup(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Remove a group
  const handleRemoveGroup = (id: string) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find and remove the group
    const findAndRemoveGroup = (group: IFilterGroup): boolean => {
      // Check if any direct child is the target
      const groupIndex = group.groups.findIndex(g => g.id === id);
      if (groupIndex !== -1) {
        // Remove the group
        group.groups.splice(groupIndex, 1);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findAndRemoveGroup(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findAndRemoveGroup(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Update a group's properties
  const handleUpdateGroup = (id: string, updates: Partial<IFilterGroup>) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find and update the group
    const findAndUpdateGroup = (group: IFilterGroup): boolean => {
      if (group.id === id) {
        // Update the group
        Object.assign(group, updates);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findAndUpdateGroup(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findAndUpdateGroup(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Update a condition
  const handleUpdateCondition = (id: string, updates: Partial<IFilterCondition>) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find and update the condition
    const findAndUpdateCondition = (group: IFilterGroup): boolean => {
      // Check in direct conditions
      const conditionIndex = group.conditions.findIndex(c => c.id === id);
      if (conditionIndex !== -1) {
        // Update the condition
        Object.assign(group.conditions[conditionIndex], updates);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findAndUpdateCondition(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findAndUpdateCondition(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Remove a condition
  const handleRemoveCondition = (id: string) => {
    // Create a deep copy of the query
    const newQuery = JSON.parse(JSON.stringify(query)) as IQuery;
    
    // Find and remove the condition
    const findAndRemoveCondition = (group: IFilterGroup): boolean => {
      // Check in direct conditions
      const conditionIndex = group.conditions.findIndex(c => c.id === id);
      if (conditionIndex !== -1) {
        // Remove the condition
        group.conditions.splice(conditionIndex, 1);
        return true;
      }
      
      // Search in nested groups
      for (const childGroup of group.groups) {
        if (findAndRemoveCondition(childGroup)) {
          return true;
        }
      }
      
      return false;
    };
    
    // Start search from root group
    findAndRemoveCondition(newQuery.rootGroup);
    
    // Update the query
    onQueryChange(newQuery);
  };
  
  // Reset the query to default state with one empty condition
  const handleResetQuery = () => {
    // Try to get a field from the first category
    let defaultField: IFieldDefinition | undefined;
    
    if (fieldCategories.length > 0 && fieldCategories[0].fields.length > 0) {
      defaultField = fieldCategories[0].fields[0];
    } else if (availableFields.length > 0) {
      defaultField = availableFields[0];
    }
    
    // If no field is found, use default values
    const fieldValue = defaultField?.value || '';
    const fieldType = defaultField?.type || 'text';
    
    const newQuery: IQuery = {
      rootGroup: {
        id: generateUniqueId(),
        operator: 'AND',
        conditions: [
          {
            id: generateUniqueId(),
            field: fieldValue,
            operator: fieldType === 'text' ? 'contains' : 'equals',
            value: fieldType === 'boolean' ? false : '',
            type: fieldType
          }
        ],
        groups: []
      }
    };
    
    onQueryChange(newQuery);
  };
  
  // Effect to update the query result when the query changes
  useEffect(() => {
    const result = generateQueryResult(query);
    setQueryResult(result);
  }, [query]);

  return (
    <div className="query-builder">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#4e165a]">בנה שאילתא</h3>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {/* Toggle JSON view */}
          <button
            onClick={() => setShowJsonView(!showJsonView)}
            className={getInputStyle({
              variant: 'ghost',
              size: 'sm',
              className: 'flex items-center'
            })}
            type="button"
          >
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {showJsonView ? 'הסתר JSON' : 'הצג JSON'}
          </button>
          
          {/* Reset button */}
          <button
            onClick={handleResetQuery}
            className={getInputStyle({
              variant: 'ghost',
              size: 'sm',
              className: 'flex items-center'
            })}
            type="button"
          >
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            איפוס שאילתא
          </button>
        </div>
      </div>
      
      {/* Main filter group container with improved visual hierarchy */}
      <div className="space-y-4 mb-6 border-r-2 border-[#f2e8f5] pr-2">
        <FilterGroup
          group={query.rootGroup}
          onUpdateGroup={handleUpdateGroup}
          onAddCondition={handleAddCondition}
          onAddGroup={handleAddGroup}
          onRemoveGroup={handleRemoveGroup}
          onUpdateCondition={handleUpdateCondition}
          onRemoveCondition={handleRemoveCondition}
          availableFields={availableFields}
          fieldCategories={fieldCategories}
        />
        
        {/* Add main filter button */}
        <div className="mt-4 flex justify-start">
          <button
            onClick={() => handleAddCondition(query.rootGroup.id)}
            className="mr-2 px-3 py-1.5 rounded-md bg-[#f2e8f5] text-[#4e165a] text-sm font-medium hover:bg-[#f2e8f5]/80 flex items-center"
            type="button"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            הוסף תנאי ראשי
          </button>
          
          <button
            onClick={() => handleAddGroup(query.rootGroup.id)}
            className="px-3 py-1.5 rounded-md bg-[#f2e8f5] text-[#4e165a] text-sm font-medium hover:bg-[#f2e8f5]/80 flex items-center"
            type="button"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            הוסף קבוצת תנאים
          </button>
        </div>
      </div>
      
      {/* Display query result */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-1">שאילתא:</h4>
        <div className="text-sm bg-white p-2 border border-gray-200 rounded-md overflow-x-auto">
          <code>{queryResult.queryString || 'לא נבנתה שאילתא עדיין'}</code>
        </div>
        
        <h4 className="text-sm font-medium text-gray-700 mt-3 mb-1">תיאור בשפה טבעית:</h4>
        <div className="text-sm p-2 bg-white border border-gray-200 rounded-md">
          {queryResult.humanReadable || 'לא נבנתה שאילתא עדיין'}
        </div>
        
        {/* JSON view */}
        {showJsonView && (
          <>
            <h4 className="text-sm font-medium text-gray-700 mt-3 mb-1">מבנה ה-JSON:</h4>
            <div className="text-sm p-2 bg-white border border-gray-200 rounded-md max-h-60 overflow-y-auto">
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(query, null, 2)}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QueryBuilder;