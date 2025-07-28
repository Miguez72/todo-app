/**
 * Todo Table Component - Theme-based with minimal inline styles
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Todo, User, PaginationState } from '../../types';
import { COLORS } from '../../constants';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { EmptyState } from '../common/EmptyState';
import { TodoTableHeader } from './TodoTableHeader';

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
}

export const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  loading,
  error,
  onEdit,
  pagination,
  onPageChange
}) => {
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
    <Box
      sx={{
        backgroundColor: 'background.paper', // Using theme color
        borderRadius: 0,
        overflow: 'hidden',
        minHeight: '400px',
        boxShadow: 'none',
        border: 'none',
        padding: { xs: '15px', sm: '20px' }, // Responsive padding using theme
      }}
    >
      {/* Table Header */}
      <Box
        className="table-header"
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 120px', // Better proportions like design
          backgroundColor: 'transparent', // No background
          borderBottom: `1px solid ${COLORS.blue.primary}`, // Dark blue bottom border
          padding: '20px 30px', // More padding like design
          gap: '20px',
          height: '60px', // Taller header
          alignItems: 'center',
          marginBottom: '20px', // 20px space before first row
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Karbon, sans-serif',
            fontWeight: 600, // Bold like design
            color: COLORS.blue.primary, // Blue color like design
            fontSize: '20px', // 20px height as requested
            letterSpacing: '0.5px',
            textAlign: 'left', // Left align like design
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          USER ID
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Karbon, sans-serif',
            fontWeight: 600, // Bold like design
            color: COLORS.blue.primary, // Blue color like design
            fontSize: '20px', // 20px height as requested
            letterSpacing: '0.5px',
            textAlign: 'left',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          TITLE
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Karbon, sans-serif',
            fontWeight: 600, // Bold like design
            color: COLORS.blue.primary, // Blue color like design
            fontSize: '20px', // 20px height as requested
            letterSpacing: '0.5px',
            textAlign: 'right', // Right align like design
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          COMPLETED
        </Typography>
      </Box>

      {/* Table Rows */}
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <Box
            className="table-row"
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 120px', // Match header columns
              padding: '25px 30px', // More padding like design
              gap: '20px',
              alignItems: 'center',
              backgroundColor: COLORS.background, // White card background
              height: '70px', // Taller rows like design
              cursor: 'pointer',
              marginBottom: '15px', // 15px space between rows
              borderRadius: '0',
              border: 'none',
              borderBottom: `2px solid ${COLORS.blue.secondary}`, // Blue border at bottom, full width
              '&:hover': {
                backgroundColor: COLORS.gray.light,
              },
              '&:last-child': {
                marginBottom: '0', // No margin on last item
              },

              // Mobile responsive
              '@media (max-width: 768px)': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: 'auto',
                padding: '15px',
                gap: '8px',
                marginBottom: '15px',
                borderBottom: `2px solid ${COLORS.blue.secondary}`,
              },
            }}
            onClick={() => onEdit(todo)}
          >
            {/* User ID */}
            <Typography
              sx={{
                fontSize: '16px', // Clean font size
                color: COLORS.text.primary,
                textAlign: 'left', // Left align like design
                fontFamily: 'Karbon, sans-serif',
                fontWeight: 400, // Regular
                lineHeight: 1.2,

                '@media (max-width: 768px)': {
                  textAlign: 'left',
                  '&::before': {
                    content: '"User ID: "',
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                  },
                },
              }}
            >
              {todo.userId}
            </Typography>

            {/* Title */}
            <Typography
              sx={{
                fontSize: '16px', // Clean font size
                color: COLORS.text.primary,
                textAlign: 'left',
                lineHeight: 1.3,
                fontFamily: 'Karbon, sans-serif',
                fontWeight: 400, // Regular

                '@media (max-width: 768px)': {
                  '&::before': {
                    content: '"Title: "',
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                    display: 'block',
                    marginBottom: '4px',
                  },
                },
              }}
            >
              {todo.title}
            </Typography>

            {/* Completion Status */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Right align like design
                alignItems: 'center',

                '@media (max-width: 768px)': {
                  justifyContent: 'flex-start',
                  '&::before': {
                    content: '"Status: "',
                    fontFamily: 'Karbon, sans-serif',
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                    marginRight: '8px',
                  },
                },
              }}
            >
              {todo.completed ? (
                // Blue checkmark for completed - Like design
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: COLORS.blue.secondary, // Blue like design
                    fontSize: '20px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  ✓
                </Box>
              ) : (
                // Red X for incomplete - Like design
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: COLORS.blue.secondary, // Blue X like design
                    fontSize: '20px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  ✗
                </Box>
              )}
            </Box>
          </Box>

          {/* Remove separate blue divider lines since we now have bottom borders on each row */}
        </React.Fragment>
      ))}

      {/* Pagination inside the data container */}
      {Math.ceil(pagination.totalItems / pagination.itemsPerPage) > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            padding: '20px 0',
            marginTop: '20px',
            backgroundColor: 'transparent', // No background

            // Mobile responsive
            '@media (max-width: 768px)': {
              gap: '2px',
              padding: '20px 0',
              flexWrap: 'wrap',
            },
          }}
        >
          {/* Left Arrow */}
          <Box
            component="button"
            className="pagination-button"
            onClick={() => pagination.currentPage > 1 && onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            sx={{
              width: '32px !important',
              height: '32px !important',
              minWidth: '32px !important',
              minHeight: '32px !important',
              maxWidth: '32px !important',
              maxHeight: '32px !important',
              borderRadius: '50% !important', // Perfect circle
              border: '1px solid #2E3A87', // Blue border
              backgroundColor: 'transparent', // No background
              display: 'flex !important',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: pagination.currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: pagination.currentPage === 1 ? 0.3 : 1,
              fontFamily: 'Karbon, sans-serif',
              padding: '0 !important',
              '&:hover': {
                backgroundColor: pagination.currentPage === 1 ? 'transparent' : '#F5F5F5',
              },
              transition: 'none !important',
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#2E3A87', lineHeight: 1, fontWeight: 400 }}>‹</Typography>
          </Box>

          {/* Page Numbers */}
          {getPageNumbers(pagination.currentPage, Math.ceil(pagination.totalItems / pagination.itemsPerPage)).map((page, index) => (
            <React.Fragment key={`${page}-${index}`}>
              {page === '...' ? (
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#666666',
                    padding: '0 4px',
                    fontFamily: 'Karbon, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  ...
                </Typography>
              ) : (
                <Box
                  component="button"
                  className="pagination-button"
                  onClick={() => onPageChange(page as number)}
                  sx={{
                    width: '32px !important',
                    height: '32px !important',
                    minWidth: '32px !important',
                    minHeight: '32px !important',
                    maxWidth: '32px !important',
                    maxHeight: '32px !important',
                    borderRadius: '50% !important', // Perfect circle
                    border: page === pagination.currentPage ? 'none' : '1px solid #2E3A87', // Blue border when inactive
                    backgroundColor: page === pagination.currentPage ? '#2E3A87' : 'transparent', // Blue when active, transparent when inactive
                    display: 'flex !important',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontFamily: 'Karbon, sans-serif',
                    boxShadow: 'none',
                    padding: '0 !important',
                    '&:hover': {
                      backgroundColor: page === pagination.currentPage ? '#2E3A87' : '#F5F5F5',
                    },
                    transition: 'none !important',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: page === pagination.currentPage ? '#FFFFFF' : '#2E3A87', // White when active, blue when inactive
                      fontWeight: page === pagination.currentPage ? 500 : 400,
                      lineHeight: 1,
                    }}
                  >
                    {page}
                  </Typography>
                </Box>
              )}
            </React.Fragment>
          ))}

          {/* Right Arrow */}
          <Box
            component="button"
            className="pagination-button"
            onClick={() => pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage) && onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
            sx={{
              width: '32px !important',
              height: '32px !important',
              minWidth: '32px !important',
              minHeight: '32px !important',
              maxWidth: '32px !important',
              maxHeight: '32px !important',
              borderRadius: '50% !important', // Perfect circle
              border: '1px solid #2E3A87', // Blue border
              backgroundColor: 'transparent', // No background
              display: 'flex !important',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 'not-allowed' : 'pointer',
              opacity: pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 0.3 : 1,
              fontFamily: 'Karbon, sans-serif',
              padding: '0 !important',
              '&:hover': {
                backgroundColor: pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 'transparent' : '#F5F5F5',
              },
              transition: 'none !important',
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#2E3A87', lineHeight: 1, fontWeight: 400 }}>›</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

/**
 * Generate page numbers to display - Same logic as PaginationControls
 */
const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = [];
  const maxPagesToShow = 7;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
};