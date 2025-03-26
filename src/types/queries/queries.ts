// Define query parameter types and interfaces

export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface BaseQueryParams extends PaginationParams, SortParams {
    search?: string;
  }
  export interface QueryBuilderConfig {
    tableName: string;
    fields: string[];
    filters?: QueryFilter[];
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }
  
  export interface QueryFilter {
    field: string;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'in' | 'between';
    value: string | number | boolean | (string | number)[];
  }
  
  export interface QueryResult<T> {
    data: T[];
    count: number;
    queryTime: number;
  }
  // Add more specific query interfaces as needed