/**
 * Custom hook for managing todos data and filtering
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Todo, TodoFilters, PaginationState, User, SortState, SortField } from '../types';
import { TodoService } from '../services/todoService';

export const useTodos = () => {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<TodoFilters>({
    titleSearch: '',
    completedFilter: null,
    userIds: []
  });

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

  // Sorting state
  const [sortState, setSortState] = useState<SortState | null>(null);

  /**
   * Simple sort comparison function
   */
  const sortTodos = useCallback((todos: Todo[], sort: SortState | null): Todo[] => {
    if (!sort) {
      // Default sort: newly created todos (timestamp IDs) first, then original todos by ID ascending
      return [...todos].sort((a, b) => {
        const aIsNew = a.id > 1000; // Assume IDs > 1000 are new todos
        const bIsNew = b.id > 1000;
        
        if (aIsNew && !bIsNew) return -1; // New todos first
        if (!aIsNew && bIsNew) return 1;  // New todos first
        if (aIsNew && bIsNew) return b.id - a.id; // Newest new todos first
        return a.id - b.id; // Original todos in ascending order
      });
    }

    return [...todos].sort((a, b) => {
      let comparison = 0;
      
      switch (sort.field) {
        case 'id':
          comparison = a.id - b.id;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'userId':
          comparison = a.userId - b.userId;
          break;
        case 'completed':
          comparison = Number(a.completed) - Number(b.completed);
          break;
        default:
          comparison = 0;
      }
      
      return sort.direction === 'desc' ? -comparison : comparison;
    });
  }, []);

  /**
   * Fetch initial data on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch todos and users in parallel
        const [todosData, usersData] = await Promise.all([
          TodoService.getAllTodos(),
          TodoService.getAllUsers()
        ]);
        
        setTodos(todosData);
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Filter and sort todos based on current filter and sort state
   */
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Apply filters
    if (filters.titleSearch.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(filters.titleSearch.toLowerCase())
      );
    }

    if (filters.completedFilter !== null) {
      result = result.filter(todo => todo.completed === filters.completedFilter);
    }

    if (filters.userIds.length > 0) {
      result = result.filter(todo => filters.userIds.includes(todo.userId));
    }

    // Apply sorting
    result = sortTodos(result, sortState);

    return result;
  }, [todos, filters, sortState, sortTodos]);

  /**
   * Get paginated todos based on current page
   */
  const paginatedTodos = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredTodos.slice(startIndex, endIndex);
  }, [filteredTodos, pagination.currentPage, pagination.itemsPerPage]);

  /**
   * Update pagination total when filtered todos change
   */
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalItems: filteredTodos.length,
      currentPage: 1 // Reset to first page when filters change
    }));
  }, [filteredTodos.length]);

  /**
   * Update title filter
   */
  const updateTitleFilter = useCallback((title: string) => {
    setFilters(prev => ({ ...prev, titleSearch: title }));
  }, []);

  /**
   * Update completed filter
   */
  const updateCompletedFilter = useCallback((completed: boolean | null) => {
    setFilters(prev => ({ ...prev, completedFilter: completed }));
  }, []);

  /**
   * Update user IDs filter
   */
  const updateUserIdsFilter = useCallback((userIds: number[]) => {
    setFilters(prev => ({ ...prev, userIds }));
  }, []);

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      titleSearch: '',
      completedFilter: null,
      userIds: []
    });
  }, []);

  /**
   * Update pagination page
   */
  const updatePage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  /**
   * Update items per page
   */
  const updateItemsPerPage = useCallback((itemsPerPage: number) => {
    setPagination(prev => ({
      ...prev,
      itemsPerPage,
      currentPage: 1 // Reset to first page
    }));
  }, []);

  /**
   * Update sort state (3-state toggle: none → asc → desc → none)
   */
  const updateSort = useCallback((field: SortField) => {
    setSortState(current => {
      if (!current || current.field !== field) {
        // Start with ascending if no sort or different field
        return { field, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        // Switch to descending
        return { field, direction: 'desc' };
      }
      // Clear sort (back to default)
      return null;
    });
    
    // Reset to first page when sorting changes
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  /**
   * Add a new todo to the list
   */
  const addTodo = useCallback(async (newTodo: Omit<Todo, 'id'>): Promise<void> => {
    try {
      const createdTodo = await TodoService.createTodo(newTodo);
      // Add to beginning of local state for immediate user feedback
      setTodos(prev => [{ ...createdTodo, id: Date.now() }, ...prev]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add todo');
    }
  }, []);

  /**
   * Update an existing todo
   */
  const updateTodo = useCallback(async (id: number, updates: Partial<Todo>): Promise<void> => {
    try {
      await TodoService.updateTodo(id, updates);
      // Update local state
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update todo');
    }
  }, []);

  /**
   * Delete a todo
   */
  const deleteTodo = useCallback(async (id: number): Promise<void> => {
    try {
      await TodoService.deleteTodo(id);
      // Remove from local state
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  }, []);

  return {
    // Data
    todos: paginatedTodos,
    users,
    filteredTodosCount: filteredTodos.length,
    
    // State
    loading,
    error,
    filters,
    pagination,
    sortState,
    
    // Filter actions
    updateTitleFilter,
    updateCompletedFilter,
    updateUserIdsFilter,
    resetFilters,
    
    // Pagination actions
    updatePage,
    updateItemsPerPage,
    
    // Sort actions
    updateSort,
    
    // CRUD actions
    addTodo,
    updateTodo,
    deleteTodo
  };
};