/**
 * Filters Panel Component - Pixel-perfect match to screenshot
 */
import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl } from '@mui/material';
import type { TodoFilters, User } from '../../types';

interface FiltersPanelProps {
  filters: TodoFilters;
  users: User[];
  usersLoading: boolean;
  onTitleFilter: (title: string) => void;
  onCompletedFilter: (completed: boolean | null) => void;
  onUserIdsFilter: (userIds: number[]) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  users,
  onTitleFilter,
  onCompletedFilter,
  onUserIdsFilter,
  onResetFilters
}) => {
  const [searchValue, setSearchValue] = React.useState(filters.titleSearch);

  // Auto-trigger search when typing at least 2 characters
  React.useEffect(() => {
    if (searchValue.length >= 2) {
      onTitleFilter(searchValue);
    } else if (searchValue.length === 0) {
      // Clear filter when search is empty
      onTitleFilter('');
    }
  }, [searchValue, onTitleFilter]);

  const handleCompletedToggle = () => {
    if (filters.completedFilter === null) {
      onCompletedFilter(false); // Set to NO (incomplete only)
    } else if (filters.completedFilter === false) {
      onCompletedFilter(true); // Set to YES (completed only)
    } else {
      onCompletedFilter(null); // Set to ALL (show everything)
    }
  };

  const getCompletedFilterLabel = () => {
    if (filters.completedFilter === null) return 'ALL';
    if (filters.completedFilter === false) return 'NO';
    return 'YES';
  };

  return (
    <Box
      className="filters-panel"
      sx={{
        border: 'none', // No border like design
        backgroundColor: '#F5F5F5', // Gray background like design
        width: '280px', // Exact width
        padding: '20px', // Exact padding
        boxShadow: 'none', // No shadow
        borderRadius: '0 !important', // Sharp corners
        fontFamily: 'Karbon, sans-serif',

        // Mobile responsive
        '@media (max-width: 768px)': {
          width: '100%',
          marginBottom: '20px',
        },
      }}
    >
      {/* FILTERS Title */}
      <Typography
        sx={{
          color: '#644C79', // Updated to match header color
          fontFamily: 'Karbon, sans-serif',
          fontWeight: 600, // Semibold
          fontSize: '36px', // Updated to 36px as requested
          marginBottom: '20px',
          textAlign: 'center',
          letterSpacing: '1px',
          lineHeight: 1,
        }}
      >
        FILTERS
      </Typography>

      {/* Search Box - Clean design with no borders */}
      <Box sx={{ marginBottom: '25px', position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            border: 'none', // No border like design
            borderRadius: '0 !important', // Sharp corners
            height: '40px', // Exact height
            overflow: 'hidden',
            backgroundColor: '#FFFFFF', // White background for search area
          }}
        >
          {/* Purple search icon area */}
          <Box
            sx={{
              backgroundColor: '#644C79', // Updated to match header color
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: '16px',
                height: '16px',
                backgroundImage: 'url(/src/assets/loupe\\ \\(2\\).svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'brightness(0) invert(1)', // Make icon white
              }}
            />
          </Box>
          
          {/* White input area */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '40px',
                border: 'none',
                borderRadius: '0 !important',
                paddingLeft: '12px',
                fontSize: '14px',
                fontFamily: 'Karbon, sans-serif',
                backgroundColor: '#FFFFFF',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                padding: '0',
                height: '40px',
                lineHeight: '40px',
              },
            }}
          />
        </Box>
      </Box>

      {/* COMPLETED Section */}
      <Box sx={{ marginBottom: '25px' }}>
        <Typography
          sx={{
            color: '#644C79', // Updated to match header color
            fontFamily: 'Karbon, sans-serif',
            fontWeight: 600, // Semibold
            fontSize: '20px', // Updated to 20px as requested
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}
        >
          COMPLETED
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0px',
          }}
        >
          <Box
            component="button"
            onClick={handleCompletedToggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '40px',
              backgroundColor: filters.completedFilter === null ? '#644C79' : 
                             filters.completedFilter === false ? '#FF6B6B' : '#4CAF50',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontFamily: 'Karbon, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: 0.8,
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            {getCompletedFilterLabel()}
          </Box>
        </Box>
      </Box>

      {/* SELECT USER ID Section */}
      <Box sx={{ marginBottom: '30px' }}>
        <Typography
          sx={{
            color: '#644C79', // Updated to match header color
            fontFamily: 'Karbon, sans-serif',
            fontWeight: 600, // Semibold
            fontSize: '20px', // Updated to 20px as requested
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}
        >
          SELECT USER ID
        </Typography>
        <FormControl fullWidth>
          <Select
            multiple
            value={filters.userIds}
            onChange={(e) => onUserIdsFilter(e.target.value as number[])}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span style={{ color: '#999', fontStyle: 'normal' }}>Select users...</span>;
              }
              return selected.join(', ');
            }}
            sx={{
              height: '40px', // Exact height
              border: 'none', // No border like design
              borderRadius: '0 !important', // Sharp corners
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'Karbon, sans-serif',
              '& .MuiSelect-select': {
                padding: '0 40px 0 12px',
                height: '40px',
                lineHeight: '40px',
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            IconComponent={() => (
              <Box
                sx={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px', // Larger icon like design
                  height: '12px', // Larger icon like design
                  backgroundImage: 'url(/src/assets/down.svg)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  pointerEvents: 'none',
                }}
              />
            )}
          >
            {users.map((user) => (
              <MenuItem 
                key={user.id} 
                value={user.id}
                sx={{
                  fontFamily: 'Karbon, sans-serif',
                  fontSize: '14px',
                }}
              >
                {user.id} - {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Reset filters link */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          component="button"
          onClick={onResetFilters}
          sx={{
            color: '#644C79', // Updated to match header color
            fontSize: '14px',
            fontFamily: 'Karbon, sans-serif',
            textDecoration: 'underline',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0,
            '&:hover': {
              color: '#4A3D6B',
            },
          }}
        >
          Reset filters
        </Typography>
      </Box>
    </Box>
  );
};