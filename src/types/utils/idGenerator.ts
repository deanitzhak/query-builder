// src/utils/idGenerator.ts

/**
 * Generates a unique ID with an optional prefix
 * Simple implementation for demonstration purposes
 */
export function generateUniqueId(prefix = 'id_'): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${prefix}${timestamp}_${randomStr}`;
  }