// src/components/list/List.tsx
import React, { useState, useEffect, useCallback } from 'react';

import { 
  IListProps, 
  ISortState, 
  IExtendedEvent, 
  ListVariant, 
  ItemVariant, 
  HeaderVariant, 
  PaginationVariant 
} from '../../../types/interfaces/events/IEvents';
import { getListContainerClass, getTableClass } from '../../variants/listTheme';

import ListHeader from './listHeader';
import ListBody from './listBody';
import Pagination from './pagination';
import SearchInput from './searchInput';

const List: React.FC<IListProps> = ({
  columns,
  dataFetcher,
  actionButtons = [],
  showPagination = true,
  itemsPerPage = 10,
  defaultSortColumn,
  defaultSortDirection = 'asc',
  onRowClick,
  emptyStateMessage = "אין נתונים להצגה",
  isLoading: externalLoading,
  variant = 'default',
  size = 'md',
  className = "",
  initialSearchQuery = "",
  refreshTrigger = 0,
}) => {
  // State management
  const [items, setItems] = useState<IExtendedEvent[]>([]);
  const [filteredItems, setFilteredItems] = useState<IExtendedEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortState, setSortState] = useState<ISortState>({
    column: defaultSortColumn || null,
    direction: defaultSortColumn ? defaultSortDirection : null,
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const paginatedItems = showPagination
    ? filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredItems;

  // Fetch data function
  const fetchData = useCallback(async () => {
    if (externalLoading !== undefined) {
      setIsLoading(externalLoading);
    } else {
      setIsLoading(true);
    }
    
    setError(null);
    
    try {
      let data: IExtendedEvent[];
      
      if (searchQuery) {
        data = await dataFetcher.searchEvents(searchQuery);
      } else {
        data = await dataFetcher.fetchEvents();
      }
      
      setItems(data);
      setFilteredItems(data);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      setError('אירעה שגיאה בטעינת הנתונים. אנא נסה שוב מאוחר יותר.');
      console.error('Error fetching data:', err);
    } finally {
      if (externalLoading === undefined) {
        setIsLoading(false);
      }
    }
  }, [dataFetcher, searchQuery, externalLoading]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  // Handle sorting
  useEffect(() => {
    if (!sortState.column || !sortState.direction) {
      setFilteredItems([...items]);
      return;
    }

    const sortedItems = [...items].sort((a, b) => {
      const columnDef = columns.find(col => col.id === sortState.column);
      if (!columnDef) return 0;

      let valueA, valueB;

      if (typeof columnDef.accessor === 'function') {
        valueA = columnDef.accessor(a);
        valueB = columnDef.accessor(b);
      } else {
        valueA = a[columnDef.accessor];
        valueB = b[columnDef.accessor];
      }

      // Handle different data types
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortState.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA === valueB) return 0;
      
      if (sortState.direction === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });

    setFilteredItems(sortedItems);
  }, [items, sortState, columns]);

  // Handle sort column change
  const handleSort = (columnId: string) => {
    setSortState(prevState => {
      if (prevState.column === columnId) {
        // Toggle direction if same column
        if (prevState.direction === 'asc') {
          return { column: columnId, direction: 'desc' };
        }
        // Clear sort if already desc
        return { column: null, direction: null };
      }
      // New column sort (default to ascending)
      return { column: columnId, direction: 'asc' };
    });
  };

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Map variants to the appropriate types for each sub-component
  const getItemVariant = (listVariant: ListVariant): ItemVariant => {
    // Map from ListVariant to ItemVariant
    const variantMapping: Record<ListVariant, ItemVariant> = {
      'default': 'default',
      'bordered': 'default', // No bordered variant for items, fallback to default
      'striped': 'striped',
      'minimal': 'minimal',
      'purple': 'purple'
    };
    return variantMapping[listVariant];
  };

  const getHeaderVariant = (listVariant: ListVariant): HeaderVariant => {
    // Map from ListVariant to HeaderVariant
    const variantMapping: Record<ListVariant, HeaderVariant> = {
      'default': 'default',
      'bordered': 'default', // No bordered variant for headers, fallback to default
      'striped': 'default', // No striped variant for headers, fallback to default
      'minimal': 'minimal',
      'purple': 'purple'
    };
    return variantMapping[listVariant];
  };

  const getPaginationVariant = (listVariant: ListVariant): PaginationVariant => {
    // Map from ListVariant to PaginationVariant
    const variantMapping: Record<ListVariant, PaginationVariant> = {
      'default': 'default',
      'bordered': 'default', // No bordered variant for pagination, fallback to default
      'striped': 'default', // No striped variant for pagination, fallback to default
      'minimal': 'minimal',
      'purple': 'purple'
    };
    return variantMapping[listVariant];
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Search input */}
      <div className="mb-4">
        <SearchInput 
          onSearch={handleSearch} 
          initialValue={initialSearchQuery} 
          placeholder="חיפוש באירועים..."
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Main list container */}
      <div className={getListContainerClass(variant, size)}>
        <table className={getTableClass(variant, size)}>
          <ListHeader
            columns={columns}
            sortState={sortState}
            onSort={handleSort}
            variant={getHeaderVariant(variant)}
            size={size}
          />
          
          <ListBody
            items={paginatedItems}
            columns={columns}
            actionButtons={actionButtons}
            isLoading={isLoading}
            emptyStateMessage={emptyStateMessage}
            onRowClick={onRowClick}
            variant={getItemVariant(variant)}
            size={size}
          />
        </table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          variant={getPaginationVariant(variant)}
        />
      )}
    </div>
  );
};

export default List;