/**
 * Completed Filter Component - Toggle switch for filtering completed/incomplete todos
 */
import React from 'react';
import { FormControlLabel, Switch, Box, Typography } from '@mui/material';

interface CompletedFilterProps {
  value: boolean | null; // null = no filter, true = completed only, false = incomplete only
  onFilter: (completed: boolean | null) => void;
}

export const CompletedFilter: React.FC<CompletedFilterProps> = ({
  value,
  onFilter
}) => {
  /**
   * Handle switch change - cycles through null -> true -> false -> null
   */
  const handleSwitchChange = () => {
    if (value === null) {
      // Currently no filter, set to completed (true)
      onFilter(true);
    } else if (value === true) {
      // Currently showing completed, set to incomplete (false)
      onFilter(false);
    } else {
      // Currently showing incomplete, remove filter (null)
      onFilter(null);
    }
  };

  /**
   * Get the label text based on current filter state
   */
  const getLabelText = () => {
    if (value === null) return 'All todos';
    if (value === true) return 'Completed only';
    return 'Incomplete only';
  };

  /**
   * Get the switch checked state
   */
  const getSwitchState = () => {
    return value !== null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Status Filter
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={getSwitchState()}
            onChange={handleSwitchChange}
            color="primary"
            size="medium"
          />
        }
        label={
          <Typography variant="body2" color="text.primary">
            {getLabelText()}
          </Typography>
        }
        sx={{
          margin: 0,
          '& .MuiFormControlLabel-label': {
            marginLeft: 1,
          },
        }}
      />
      {value !== null && (
        <Typography variant="caption" color="primary.main">
          {value ? '✓ Showing completed todos' : '○ Showing incomplete todos'}
        </Typography>
      )}
    </Box>
  );
};