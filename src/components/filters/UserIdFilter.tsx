/**
 * UserID Filter Component - Multi-select dropdown for filtering by user IDs
 */
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  OutlinedInput
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { User } from '../../types';

interface UserIdFilterProps {
  selectedUserIds: number[];
  users: User[];
  onFilter: (userIds: number[]) => void;
  loading?: boolean;
}

export const UserIdFilter: React.FC<UserIdFilterProps> = ({
  selectedUserIds,
  users,
  onFilter,
  loading = false
}) => {
  /**
   * Handle selection change in the multi-select dropdown
   */
  const handleSelectionChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;
    // Ensure we always get an array of numbers
    const selectedIds = typeof value === 'string' ? [] : value;
    onFilter(selectedIds);
  };

  /**
   * Handle chip deletion
   */
  const handleChipDelete = (userIdToDelete: number) => {
    const updatedIds = selectedUserIds.filter(id => id !== userIdToDelete);
    onFilter(updatedIds);
  };

  /**
   * Get user name by ID
   */
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Filter by Users
      </Typography>
      
      <FormControl fullWidth variant="outlined" disabled={loading}>
        <InputLabel id="user-filter-label">Select Users</InputLabel>
        <Select
          labelId="user-filter-label"
          multiple
          value={selectedUserIds}
          onChange={handleSelectionChange}
          input={<OutlinedInput label="Select Users" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((userId) => (
                <Chip
                  key={userId}
                  label={getUserName(userId)}
                  size="small"
                  onDelete={() => handleChipDelete(userId)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{
                    height: 24,
                    '& .MuiChip-deleteIcon': {
                      fontSize: 16,
                    },
                  }}
                />
              ))}
            </Box>
          )}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                width: 250,
              },
            },
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                Loading users...
              </Typography>
            </MenuItem>
          ) : users.length === 0 ? (
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                No users available
              </Typography>
            </MenuItem>
          ) : (
            users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Typography variant="body2">
                  {user.name} (ID: {user.id})
                </Typography>
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {selectedUserIds.length > 0 && (
        <Typography variant="caption" color="primary.main">
          Filtering by {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''}
        </Typography>
      )}
    </Box>
  );
};