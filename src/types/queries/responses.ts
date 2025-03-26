// Define API response types

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }