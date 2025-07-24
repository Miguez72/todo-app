/**
 * TypeScript interfaces for the Todo application
 */

// Main Todo interface based on jsonplaceholder API
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Filter interface for managing filter state
export interface TodoFilters {
  titleSearch: string;
  completedFilter: boolean | null; // null means no filter, true/false for completed/incomplete
  userIds: number[];
}

// Pagination interface for managing pagination state
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

// User interface for the UserID dropdown
export interface User {
  id: number;
  name: string;
}