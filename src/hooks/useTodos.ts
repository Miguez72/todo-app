/**
 * Custom hook for managing todos data and filtering
 */
import { useState, useEffect, useMemo } from 'react';
import type { Todo, TodoFilters, PaginationState, User } from '../types';
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
   * Filter todos based on current filter state
   */
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Filter by title (case-insensitive)
    if (filters.titleSearch.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(filters.titleSearch.toLowerCase())
      );
    }

    // Filter by completion status
    if (filters.completedFilter !== null) {
      result = result.filter(todo => todo.completed === filters.completedFilter);
    }

    // Filter by user IDs
    if (filters.userIds.length > 0) {
      result = result.filter(todo => filters.userIds.includes(todo.userId));
    }

    return result;
  }, [todos, filters]);

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
  const updateTitleFilter = (title: string) => {
    setFilters(prev => ({ ...prev, titleSearch: title }));
  };

  /**
   * Update completed filter
   */
  const updateCompletedFilter = (completed: boolean | null) => {
    setFilters(prev => ({ ...prev, completedFilter: completed }));
  };

  /**
   * Update user IDs filter
   */
  const updateUserIdsFilter = (userIds: number[]) => {
    setFilters(prev => ({ ...prev, userIds }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setFilters({
      titleSearch: '',
      completedFilter: null,
      userIds: []
    });
  };

  /**
   * Update pagination page
   */
  const updatePage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  /**
   * Update items per page
   */
  const updateItemsPerPage = (itemsPerPage: number) => {
    setPagination(prev => ({
      ...prev,
      itemsPerPage,
      currentPage: 1 // Reset to first page
    }));
  };

  /**
   * Add a new todo to the list
   */
  const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<void> => {
    try {
      const createdTodo = await TodoService.createTodo(newTodo);
      // Add to local state (since jsonplaceholder doesn't persist)
      setTodos(prev => [...prev, { ...createdTodo, id: Date.now() }]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  /**
   * Update an existing todo
   */
  const updateTodo = async (id: number, updates: Partial<Todo>): Promise<void> => {
    try {
      await TodoService.updateTodo(id, updates);
      // Update local state
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  /**
   * Delete a todo
   */
  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await TodoService.deleteTodo(id);
      // Remove from local state
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

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
    
    // Filter actions
    updateTitleFilter,
    updateCompletedFilter,
    updateUserIdsFilter,
    resetFilters,
    
    // Pagination actions
    updatePage,
    updateItemsPerPage,
    
    // CRUD actions
    addTodo,
    updateTodo,
    deleteTodo
  };
};