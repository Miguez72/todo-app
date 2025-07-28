/**
 * LoadingState Component - Theme-based loading display
 */
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading todos...' 
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
      <CircularProgress color="primary" size={32} />
      <Typography 
        variant="body1" 
        color="text.secondary" // Theme color
      >
        {message}
      </Typography>
    </Box>
  );
};
