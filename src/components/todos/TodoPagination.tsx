/**
 * Todo Pagination Component - Handles pagination controls for todo list
 */
import React from 'react';
import {
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { PaginationState } from '../../types';

interface TodoPaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const TodoPagination: React.FC<TodoPaginationProps> = ({
  pagination,
  onPageChange,
  onItemsPerPageChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { currentPage, itemsPerPage, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * Handle page change from pagination component
   */
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  /**
   * Handle items per page change
   */
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  /**
   * Calculate display range
   */
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Don't render if there's only one page and few items
  if (totalItems <= itemsPerPage && totalPages <= 1) {
    return null;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mt: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Results Info */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            order: isMobile ? 2 : 1,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          Showing {startItem}-{endItem} of {totalItems} todo{totalItems !== 1 ? 's' : ''}
        </Typography>

        {/* Pagination Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            order: isMobile ? 1 : 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {/* Items per page selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
              Per page:
            </Typography>
            <FormControl size="small" variant="outlined">
              <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                sx={{
                  minWidth: 70,
                  '& .MuiSelect-select': {
                    py: 0.5,
                    fontSize: '0.875rem',
                  },
                }}
              >
                {[5, 10, 20, 50].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Page navigation */}
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              showFirstButton
              showLastButton
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  minWidth: isMobile ? 32 : 40,
                  height: isMobile ? 32 : 40,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                },
              }}
            />
          )}
        </Box>
      </Box>

      {/* Additional Info */}
      {totalPages > 1 && (
        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Typography variant="caption" color="text.disabled">
            Page {currentPage} of {totalPages} • {totalItems} total result{totalItems !== 1 ? 's' : ''}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};