/**
 * SortableHeaderCell Component - Interactive table header with sorting
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import type { SortField, SortState } from '../../types';

interface SortableHeaderCellProps {
  field: SortField;
  label: string;
  sortState: SortState | null;
  onSort: (field: SortField) => void;
  align?: 'left' | 'center' | 'right';
}

export const SortableHeaderCell: React.FC<SortableHeaderCellProps> = ({
  field,
  label,
  sortState,
  onSort,
  align = 'left'
}) => {
  
  const isActive = sortState?.field === field;
  const isAscending = isActive && sortState?.direction === 'asc';
  const isDescending = isActive && sortState?.direction === 'desc';

  const handleClick = () => {
    onSort(field);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          opacity: 0.8,
        },
        '&:active': {
          transform: 'scale(0.98)',
        }
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: isActive ? 'primary.main' : 'tertiary.main',
          fontSize: { xs: '16px', sm: '20px' },
          letterSpacing: '0.5px',
          lineHeight: 1,
          textTransform: 'uppercase',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: align === 'right' ? 0 : 1,
          marginRight: align === 'right' ? 1 : 0,
          height: '20px',
          width: '16px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isActive && (
          <>
            {isAscending && (
              <KeyboardArrowUp
                sx={{
                  fontSize: '20px',
                  color: 'primary.main',
                  animation: 'fadeIn 0.2s ease',
                }}
              />
            )}
            {isDescending && (
              <KeyboardArrowDown
                sx={{
                  fontSize: '20px',
                  color: 'primary.main',
                  animation: 'fadeIn 0.2s ease',
                }}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};