/**
 * EmptyState Component - Theme-based empty state display
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No todos found' 
}) => {
  return (
    <Box
      sx={{
        padding: 5, // Theme spacing (40px)
        textAlign: 'center',
        backgroundColor: 'background.default', // Theme color
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2, // Theme spacing
      }}
    >
      <SearchOffIcon 
        sx={{ 
          fontSize: 48, 
          color: 'text.disabled' // Theme color
        }} 
      />
      <Typography 
        variant="body1" 
        color="text.secondary" // Theme color
      >
        {message}
      </Typography>
    </Box>
  );
};
