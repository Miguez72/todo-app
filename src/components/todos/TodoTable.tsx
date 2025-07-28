/**
 * Todo Table Component - Fully theme-based implementation
 */
import React from 'react';
import { Typography } from '@mui/material';
import type { Todo, User, PaginationState, SortState, SortField } from '../../types';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { EmptyState } from '../common/EmptyState';
import { TodoTableHeader } from './TodoTableHeader';
import {
  TableContainer,
  TableRow,
  PaginationContainer,
  PaginationButton,
  PaginationNumber,
} from './TodoTable.styled';

interface TodoTableProps {
  todos: Todo[];
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  sortState: SortState | null;
  onSort: (field: SortField) => void;
}

export const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  loading,
  error,
  onEdit,
  pagination,
  onPageChange,
  sortState,
  onSort
}) => {
  /**
   * Calculate total pages from pagination state
   */
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  /**
   * Render loading state
   */
  if (loading) {
    return <LoadingState />;
  }

  /**
   * Render error state
   */
  if (error) {
    return <ErrorState message={error} />;
  }

  /**
   * Render empty state
   */
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <TableContainer>
      {/* Sortable Table Header */}
      <TodoTableHeader
        sortState={sortState}
        onSort={onSort}
      />

      {/* Table Rows */}
      {todos.map((todo) => (
        <TableRow key={todo.id} onClick={() => onEdit(todo)}>
          <Typography variant="tableCell">
            {todo.userId}
          </Typography>
          <Typography variant="tableCell">
            {todo.title}
          </Typography>
          <Typography 
            variant="tableCell" 
            sx={{ 
              textAlign: 'right',
              color: todo.completed ? 'success.main' : 'error.main',
              fontWeight: 600,
              fontSize: '18px', // Larger for icons
            }}
          >
            {todo.completed ? '✓' : '✗'}
          </Typography>
        </TableRow>
      ))}

      {/* Pagination */}
      <PaginationContainer>
        {/* Previous Button */}
        <PaginationButton
          onClick={() => onPageChange(pagination.currentPage - 1)}
          sx={{
            visibility: pagination.currentPage > 1 ? 'visible' : 'hidden',
          }}
        >
          <Typography variant="paginationText">‹</Typography>
        </PaginationButton>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => {
            // Show pages around current page
            const distance = Math.abs(page - pagination.currentPage);
            return distance <= 2 || page === 1 || page === totalPages;
          })
          .map((page, index, array) => {
            // Add ellipsis if needed
            const shouldShowEllipsis = index > 0 && page - array[index - 1] > 1;
            
            return (
              <React.Fragment key={page}>
                {shouldShowEllipsis && (
                  <Typography variant="paginationText" sx={{ px: 1 }}>
                    ...
                  </Typography>
                )}
                <PaginationNumber
                  active={page === pagination.currentPage}
                  onClick={() => onPageChange(page)}
                >
                  <Typography 
                    variant="paginationText"
                    sx={{
                      color: page === pagination.currentPage ? 'background.default' : 'tertiary.main',
                    }}
                  >
                    {page}
                  </Typography>
                </PaginationNumber>
              </React.Fragment>
            );
          })}

        {/* Next Button */}
        <PaginationButton
          onClick={() => onPageChange(pagination.currentPage + 1)}
          sx={{
            visibility: pagination.currentPage < totalPages ? 'visible' : 'hidden',
          }}
        >
          <Typography variant="paginationText">›</Typography>
        </PaginationButton>
      </PaginationContainer>
    </TableContainer>
  );
};
