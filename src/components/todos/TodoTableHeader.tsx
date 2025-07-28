/**
 * TodoTableHeader Component - Interactive sortable table header
 */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { SortableHeaderCell } from './SortableHeaderCell';
import type { SortField, SortState } from '../../types';

interface TodoTableHeaderProps {
  sortState: SortState | null;
  onSort: (field: SortField) => void;
}

export const TodoTableHeader: React.FC<TodoTableHeaderProps> = ({
  sortState,
  onSort
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 120px',
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${theme.palette.tertiary.main}`,
        padding: { xs: '15px 20px', sm: '20px 30px' }, // Responsive padding
        gap: 2.5, // Theme spacing
        height: { xs: '50px', sm: '60px' }, // Responsive height
        alignItems: 'center',
        marginBottom: 2.5, // Theme spacing
      }}
    >
      <SortableHeaderCell
        field="userId"
        label="USER ID"
        sortState={sortState}
        onSort={onSort}
        align="left"
      />
      
      <SortableHeaderCell
        field="title"
        label="TITLE"
        sortState={sortState}
        onSort={onSort}
        align="left"
      />
      
      <SortableHeaderCell
        field="completed"
        label="STATUS"
        sortState={sortState}
        onSort={onSort}
        align="right"
      />
    </Box>
  );
};
