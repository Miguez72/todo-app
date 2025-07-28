/**
 * Application constants and configuration
 * Centralized configuration for the todo application
 */

export const APP_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT: 10000, // 10 seconds
  
  // Pagination Configuration
  DEFAULT_ITEMS_PER_PAGE: 10,
  ITEMS_PER_PAGE_OPTIONS: [5, 10, 20, 50],
  MAX_ITEMS_PER_PAGE: 100,
  
  // Search Configuration
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DEBOUNCE_MS: 300,
  
  // UI Configuration
  SNACKBAR_AUTO_HIDE_DURATION: 6000,
  ANIMATION_DURATION: 300,
  
  // Validation Rules
  TODO_TITLE_MIN_LENGTH: 3,
  TODO_TITLE_MAX_LENGTH: 200,
  
  // Performance Thresholds
  SLOW_OPERATION_THRESHOLD: 100, // ms
  MEDIUM_OPERATION_THRESHOLD: 50, // ms
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

export const COLORS = {
  primary: '#644C79',
  secondary: '#4A9EE7',
  success: '#4CAF50',
  error: '#FF6B6B',
  warning: '#FF9800',
  background: '#FFFFFF',
  container: '#F5F5F5',
  blue: {
    primary: '#2E3A87',
    secondary: '#4A9EE7',
    dark: '#1E3A8A', // Footer blue
  },
  gray: {
    light: '#FAFAFA',
    medium: '#F5F5F5',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#999999',
    error: '#E74C3C',
  },
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
} as const;

export const SUCCESS_MESSAGES = {
  TODO_CREATED: 'Todo created successfully!',
  TODO_UPDATED: 'Todo updated successfully!',
  TODO_DELETED: 'Todo deleted successfully!',
  TODO_COMPLETED: 'Todo marked as completed!',
  TODO_INCOMPLETE: 'Todo marked as incomplete!',
} as const;
