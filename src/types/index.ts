// Export all types from their respective files
export * from './objects/objects';
export * from './queries/queries';
export * from './queries/responses';
export * from './queries/common';
export * from './queries/common';
export * from './interfaces/layout/IHeader';

// You can also define some core types directly in this file if needed
export type ID = string | number;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;