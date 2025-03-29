// src/types/interfaces/events/IEvents.ts

// Define consistent variant types
export type ListVariant = 'default' | 'bordered' | 'striped' | 'minimal' | 'purple';
export type ItemVariant = 'default' | 'purple' | 'striped' | 'minimal';
export type HeaderVariant = 'default' | 'purple' | 'light' | 'minimal';
export type PaginationVariant = 'default' | 'minimal' | 'purple';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive' | 'ghost';
export type SizeVariant = 'sm' | 'md' | 'lg';

// Base event interface with required properties
export interface IEvent {
  id: number;
  department: string;
  name: string;
  date: string;
  hall: string;
  forSale: number;
  sold: number;
  reserved: number;
  available: number;
}

// Extended event interface for additional properties
export interface IExtendedEvent extends IEvent {
  [key: string]: any; // Allow dynamic additional properties
}

// Column definition interface for dynamic column handling
export interface IColumn {
  id: string;
  header: string;
  accessor: string | ((item: IExtendedEvent) => any);
  align?: 'right' | 'center' | 'left';
  className?: string;
  isSortable?: boolean;
  cellRenderer?: (value: any, item: IExtendedEvent) => React.ReactNode;
}

// Action button definition
export interface IActionButton {
  id: string;
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  onClick: (item: IExtendedEvent) => void;
  isDisabled?: (item: IExtendedEvent) => boolean;
  showCondition?: (item: IExtendedEvent) => boolean;
}

// Sort state interface
export interface ISortState {
  column: string | null;
  direction: 'asc' | 'desc' | null;
}

// Data fetcher interface
export interface IEventDataFetcher {
  fetchEvents: (params?: any) => Promise<IExtendedEvent[]>;
  fetchEventById: (id: number) => Promise<IExtendedEvent | null>;
  searchEvents: (query: string, params?: any) => Promise<IExtendedEvent[]>;
}

// Props for the list component
export interface IListProps {
  columns: IColumn[];
  dataFetcher: IEventDataFetcher;
  actionButtons?: IActionButton[];
  showPagination?: boolean;
  itemsPerPage?: number;
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onRowClick?: (item: IExtendedEvent) => void;
  emptyStateMessage?: string;
  isLoading?: boolean;
  variant?: ListVariant;
  size?: SizeVariant;
  className?: string;
  initialSearchQuery?: string;
  refreshTrigger?: number; // To force refresh from parent component
}

// Props for the list item component
export interface IListItemProps {
  item: IExtendedEvent;
  columns: IColumn[];
  actionButtons?: IActionButton[];
  isSelected?: boolean;
  onClick?: (item: IExtendedEvent) => void;
  variant?: ItemVariant;
  size?: SizeVariant;
}

// Props for the list body component
export interface IListBodyProps {
  items: IExtendedEvent[];
  columns: IColumn[];
  actionButtons?: IActionButton[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  onRowClick?: (item: IExtendedEvent) => void;
  variant?: ItemVariant;
  size?: SizeVariant;
}

// Props for the pagination component
export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
}

// Props for the header component of the list
export interface IListHeaderProps {
  columns: IColumn[];
  sortState: ISortState;
  onSort: (columnId: string) => void;
  variant?: HeaderVariant;
  size?: SizeVariant;
}

// Props for the search component
export interface ISearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  variant?: ButtonVariant;
}