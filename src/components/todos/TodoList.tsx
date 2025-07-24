/**
 * Todo List Component - Displays list of todos with pagination
 */
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Alert,
  Fab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TodoItem } from './TodoItem';
import { TodoPagination } from './TodoPagination';
import type { Todo, User, PaginationState } from '../../types';

interface TodoListProps {
  todos: Todo[];
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onCreateNew: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  users,
  loading,
  error,
  pagination,
  onEdit,
  onDelete,
  onToggleComplete,
  onPageChange,
  onItemsPerPageChange,
  onCreateNew
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Render loading skeletons
   */
  const renderLoadingSkeletons = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
          </Box>
          <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={20} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="rectangular" width={80} height={20} />
          </Box>
        </Paper>
      ))}
    </Box>
  );

  /**
   * Render error state
   */
  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Failed to load todos
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        <Typography variant="body2" color="text.secondary">
          Please check your connection and try again.
        </Typography>
      </Paper>
    );
  }

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: 'grey.50',
        border: `2px dashed ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        📝 No todos found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {pagination.totalItems === 0 
          ? "Get started by creating your first todo!"
          : "Try adjusting your filters to see more results."
        }
      </Typography>
      <Fab
        variant="extended"
        color="primary"
        onClick={onCreateNew}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Create Todo
      </Fab>
    </Paper>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          📋 Todos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Page {pagination.currentPage} of {Math.ceil(pagination.totalItems / pagination.itemsPerPage) || 1}
        </Typography>
      </Box>

      {/* Loading State */}
      {loading && renderLoadingSkeletons()}

      {/* Todo List */}
      {!loading && todos.length === 0 && renderEmptyState()}

      {!loading && todos.length > 0 && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                users={users}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </Box>

          {/* Pagination */}
          <TodoPagination
            pagination={pagination}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </>
      )}

      {/* Floating Action Button for Create */}
      {!loading && (
        <Fab
          color="primary"
          aria-label="create todo"
          onClick={onCreateNew}
          sx={{
            position: 'fixed',
            bottom: isMobile ? 16 : 24,
            right: isMobile ? 16 : 24,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};