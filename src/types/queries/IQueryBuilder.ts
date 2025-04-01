// src/types/interfaces/query/IQueryBuilder.ts

// Define filter operation types
export type FilterOperator = 
  | 'equals' 
  | 'notEquals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith'
  | 'greaterThan' 
  | 'lessThan' 
  | 'between'
  | 'in'
  | 'notIn';

// Define filter input types
export type FilterType = 
  | 'text' 
  | 'number' 
  | 'date' 
  | 'select' 
  | 'multiSelect'
  | 'boolean';

// Define logical operators for condition groups
export type LogicalOperator = 'AND' | 'OR';

// Define a field category structure
export interface IFieldCategory {
  id: string;
  name: string;
  fields: IFieldDefinition[];
}

// Define a field definition
export interface IFieldDefinition {
  value: string;
  label: string;
  type: FilterType;
  category?: string;
  options?: Array<{value: string | number, label: string}>;
  description?: string;
}

// Define a single filter condition
export interface IFilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: any;
  type: FilterType;
  negated?: boolean;
  label?: string;
  options?: Array<{value: string | number, label: string}>;
}

// Define a filter group that contains conditions or other groups
export interface IFilterGroup {
    id: string;
    operator: LogicalOperator;  // Default operator
    childOperators?: LogicalOperator[];  // Operator for each specific pair
    negated?: boolean;
    conditions: IFilterCondition[];
    groups: IFilterGroup[];
  }
// Define the complete query
export interface IQuery {
  rootGroup: IFilterGroup;
}

// Define props for filter condition component
export interface IFilterConditionProps {
  condition: IFilterCondition;
  onUpdate: (id: string, updates: Partial<IFilterCondition>) => void;
  onRemove: (id: string) => void;
  availableFields: IFieldDefinition[];
  fieldCategories: IFieldCategory[];
}

// Define props for filter group component
export interface IFilterGroupProps {
  group: IFilterGroup;
  level?: number;
  onUpdateGroup: (id: string, updates: Partial<IFilterGroup>) => void;
  onAddCondition: (groupId: string) => void;
  onAddGroup: (parentId: string) => void;
  onRemoveGroup: (id: string) => void;
  onUpdateCondition: (id: string, updates: Partial<IFilterCondition>) => void;
  onRemoveCondition: (id: string) => void;
  availableFields: IFieldDefinition[];
  fieldCategories: IFieldCategory[];
}

// Define props for query builder component
export interface IQueryBuilderProps {
  query: IQuery;
  onQueryChange: (query: IQuery) => void;
  availableFields: IFieldDefinition[];
  fieldCategories: IFieldCategory[];
}

// Define the output of the query builder
export interface IQueryResult {
  queryString: string;
  humanReadable: string;
  params: Record<string, any>;
}