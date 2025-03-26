
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Dictionary<T> {
  [key: string]: T;
}