// src/components/query/UpdatedQueryBuilderSection.tsx
import React, { useState } from 'react';
import { 
  IQuery, 
  FilterType,
  IFieldDefinition,
  IFieldCategory 
} from '../../../types/queries/IQueryBuilder';
import QueryBuilder from './QueryBuilder';
import { generateUniqueId } from '../../../types/utils/idGenerator';
import { getInputStyle } from '../../variants/buttonThemes';

interface QueryBuilderSectionProps {
  onSearch: (query: IQuery) => void;
  onClose: () => void;
}

/**
 * QueryBuilderSection component that contains the query builder
 * and handles creating, saving, and executing queries
 */
const UpdatedQueryBuilderSection: React.FC<QueryBuilderSectionProps> = ({
  onSearch,
  onClose
}) => {
  // Define field categories
  const fieldCategories: IFieldCategory[] = [
    {
      id: 'event',
      name: 'פרטי אירוע',
      fields: [
        { 
          value: 'name', 
          label: 'שם אירוע', 
          type: 'text' as FilterType 
        },
        { 
          value: 'description', 
          label: 'תיאור', 
          type: 'text' as FilterType 
        },
        { 
          value: 'duration', 
          label: 'משך', 
          type: 'number' as FilterType 
        },
        { 
          value: 'status', 
          label: 'סטטוס אירוע', 
          type: 'select' as FilterType,
          options: [
            { value: 'פעיל', label: 'פעיל' },
            { value: 'כמעט אזל', label: 'כמעט אזל' },
            { value: 'אזל', label: 'אזל' },
          ]
        }
      ]
    },
    {
      id: 'venue',
      name: 'מיקום',
      fields: [
        { 
          value: 'hall', 
          label: 'אולם', 
          type: 'select' as FilterType,
          options: [
            { value: 'אולם ראשי', label: 'אולם ראשי' },
            { value: 'אולם קטן', label: 'אולם קטן' },
            { value: 'אולם הרצאות', label: 'אולם הרצאות' },
            { value: 'אולם משפחה', label: 'אולם משפחה' },
            { value: 'אולם קולנוע', label: 'אולם קולנוע' },
          ]
        },
        { 
          value: 'department', 
          label: 'מחלקה', 
          type: 'select' as FilterType,
          options: [
            { value: 'תיאטרון', label: 'תיאטרון' },
            { value: 'מוזיקה', label: 'מוזיקה' },
            { value: 'הרצאות', label: 'הרצאות' },
            { value: 'ילדים', label: 'ילדים' },
            { value: 'מחול', label: 'מחול' },
            { value: 'קולנוע', label: 'קולנוע' },
            { value: 'סטנדאפ', label: 'סטנדאפ' },
          ]
        },
        { 
          value: 'location', 
          label: 'מיקום', 
          type: 'text' as FilterType 
        }
      ]
    },
    {
      id: 'tickets',
      name: 'כרטיסים',
      fields: [
        { 
          value: 'available', 
          label: 'כרטיסים זמינים', 
          type: 'number' as FilterType 
        },
        { 
          value: 'sold', 
          label: 'כרטיסים שנמכרו', 
          type: 'number' as FilterType 
        },
        { 
          value: 'forSale', 
          label: 'כרטיסים למכירה', 
          type: 'number' as FilterType 
        },
        { 
          value: 'reserved', 
          label: 'כרטיסים משוריינים', 
          type: 'number' as FilterType 
        },
        { 
          value: 'price', 
          label: 'מחיר', 
          type: 'number' as FilterType 
        }
      ]
    },
    {
      id: 'dates',
      name: 'תאריכים וזמנים',
      fields: [
        { 
          value: 'date', 
          label: 'תאריך אירוע', 
          type: 'date' as FilterType 
        },
        { 
          value: 'time', 
          label: 'שעה', 
          type: 'text' as FilterType 
        },
        { 
          value: 'createdAt', 
          label: 'תאריך יצירה', 
          type: 'date' as FilterType 
        }
      ]
    }
  ];

  // Flatten all fields for use when needed
  const allFields: IFieldDefinition[] = fieldCategories.flatMap(cat => cat.fields);
  
  // Initial query with one empty condition
  const initialQuery: IQuery = {
    rootGroup: {
      id: generateUniqueId(),
      operator: 'AND',
      conditions: [
        {
          id: generateUniqueId(),
          field: fieldCategories[0]?.fields[0]?.value || '',
          operator: 'contains',
          value: '',
          type: fieldCategories[0]?.fields[0]?.type || 'text'
        }
      ],
      groups: []
    }
  };
  
  // State for the current query
  const [query, setQuery] = useState<IQuery>(initialQuery);
  // State for saved queries
  const [savedQueries, setSavedQueries] = useState<{id: string, name: string, query: string}[]>([]);
  
  // Handle query changes
  const handleQueryChange = (newQuery: IQuery) => {
    setQuery(newQuery);
  };
  
  // Handle search button click
  const handleSearch = () => {
    onSearch(query);
    onClose();
  };
  
  // Save current query with a name
  const handleSaveQuery = () => {
    const queryName = prompt('הזן שם לשמירת השאילתא:');
    
    if (queryName) {
      // Create a new saved query
      const savedQuery = {
        id: generateUniqueId('saved_query_'),
        name: queryName,
        query: JSON.stringify(query)
      };
      
      // Update the saved queries list
      setSavedQueries([...savedQueries, savedQuery]);
      
      alert(`השאילתא "${queryName}" נשמרה בהצלחה`);
    }
  };
  
  // Load a saved query
  const handleLoadQuery = (savedQueryJson: string) => {
    try {
      const loadedQuery = JSON.parse(savedQueryJson) as IQuery;
      setQuery(loadedQuery);
    } catch (error) {
      console.error('Failed to load query:', error);
      alert('טעינת השאילתא נכשלה');
    }
  };

  return (
    <div className="query-builder-section">
      {/* Saved queries section */}
      {savedQueries.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">שאילתות שמורות</h3>
          <div className="flex flex-wrap gap-2">
            {savedQueries.map(item => (
              <button
                key={item.id}
                onClick={() => handleLoadQuery(item.query)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                type="button"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Query builder */}
      <QueryBuilder
        query={query}
        onQueryChange={handleQueryChange}
        availableFields={allFields}
        fieldCategories={fieldCategories}
      />
      
      {/* Action buttons */}
      <div className="flex justify-end space-x-4 space-x-reverse mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className={getInputStyle({
            variant: 'ghost',
            size: 'md',
            className: 'w-auto px-4',
          })}
          type="button"
        >
          בטל
        </button>
        
        <button
          onClick={handleSaveQuery}
          className={getInputStyle({
            variant: 'secondary',
            size: 'md',
            className: 'w-auto px-4',
          })}
          type="button"
        >
          שמור שאילתא
        </button>
        
        <button
          onClick={handleSearch}
          className={getInputStyle({
            variant: 'primary',
            size: 'md',
            className: 'w-auto px-4 bg-[#4e165a] text-white',
          })}
          type="button"
        >
          חפש
        </button>
      </div>
    </div>
  );
};

export default UpdatedQueryBuilderSection;