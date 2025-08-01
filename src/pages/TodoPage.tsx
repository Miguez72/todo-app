/**
 * Todo Page Component - Pixel-perfect match to screenshot with responsive design
 */
import React, { useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { FiltersPanel } from '../components/filters/FiltersPanel';
import { TodoTable } from '../components/todos/TodoTable';
import { TodoEditDialog } from '../components/todos/TodoEditDialog';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types';

export const TodoPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Todo management hook
  const {
    todos,
    users,
    filteredTodosCount,
    loading,
    error,
    filters,
    pagination,
    sortState,
    updateTitleFilter,
    updateCompletedFilter,
    updateUserIdsFilter,
    resetFilters,
    updatePage,
    updateSort,
    addTodo,
    updateTodo,
    deleteTodo
  } = useTodos();

  // Local UI state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  /**
   * Show snackbar notification
   */
  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  /**
   * Handle editing an existing todo
   */
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setEditDialogOpen(true);
  };

  /**
   * Handle saving todo (create or update)
   */
  const handleSaveTodo = async (todoData: Omit<Todo, 'id'>) => {
    try {
      if (editingTodo) {
        // Update existing todo
        await updateTodo(editingTodo.id, todoData);
        showNotification('Todo updated successfully!', 'success');
      } else {
        // Create new todo
        await addTodo(todoData);
        showNotification('Todo created successfully!', 'success');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      showNotification(message, 'error');
      throw error; // Re-throw to let the dialog handle it
    }
  };

  /**
   * Handle deleting a todo
   */
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      showNotification('Todo deleted successfully!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete todo';
      showNotification(message, 'error');
    }
  };

  /**
   * Handle toggling todo completion status
   */
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed });
      showNotification(
        completed ? 'Todo marked as completed!' : 'Todo marked as incomplete!',
        'info'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update todo';
      showNotification(message, 'error');
    }
  };

  /**
   * Handle closing snackbar
   */
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  /**
   * Handle creating a new todo
   */
  const handleCreateNew = () => {
    setEditingTodo(null); // Set to null for create mode
    setEditDialogOpen(true);
  };

  /**
   * Handle closing edit dialog
   */
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingTodo(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default', // Using theme color
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Karbon, sans-serif',
        width: '100vw',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: { xs: 2.5, md: 3.75 }, // Using theme spacing
          padding: { xs: 2.5, md: 5 }, // Using theme spacing
          maxWidth: '1400px', // Max container width
          margin: '0 auto', // Center the container
          width: '100%',
          alignItems: 'flex-start', // Align to top
          justifyContent: 'center', // Center content horizontally

          // Use theme breakpoints
          [theme.breakpoints.down('md')]: {
            gap: 2.5,
            padding: 2.5,
            justifyContent: 'center',
          },

          [theme.breakpoints.between('md', 'lg')]: {
            gap: 3.125,
            padding: 3.75,
            justifyContent: 'center',
          },
        }}
      >
        {/* Left Panel - Filters */}
        <Box
          sx={{
            order: isMobile ? 2 : 1,
            flex: '0 0 auto',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <FiltersPanel
            filters={filters}
            users={users}
            usersLoading={loading}
            onTitleFilter={updateTitleFilter}
            onCompletedFilter={updateCompletedFilter}
            onUserIdsFilter={updateUserIdsFilter}
            onResetFilters={resetFilters}
            onCreateNew={handleCreateNew}
            resultsCount={filteredTodosCount}
          />
        </Box>

        {/* Right Panel - Todo Table */}
        <Box
          sx={{
            flex: 1,
            order: isMobile ? 1 : 2,
            minWidth: 0, // Allow shrinking
            width: '100%',
          }}
        >
          <TodoTable
            todos={todos}
            users={users}
            loading={loading}
            error={error}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            pagination={pagination}
            onPageChange={updatePage}
            sortState={sortState}
            onSort={updateSort}
          />
          
          {/* Pagination now integrated inside TodoTable */}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Edit/Create Dialog */}
      <TodoEditDialog
        open={editDialogOpen}
        todo={editingTodo}
        users={users}
        onClose={handleCloseEditDialog}
        onSave={handleSaveTodo}
        onDelete={handleDeleteTodo}
        loading={loading}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            fontFamily: 'inherit', // Will inherit from theme
            borderRadius: 0,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};