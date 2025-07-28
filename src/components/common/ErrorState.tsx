/**
 * ErrorState Component - Theme-based error display
 */
import React from 'react';
import { Box, Typography, Alert } from '@mui/material';

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <Box
      sx={{
        padding: 5, // Theme spacing (40px)
        textAlign: 'center',
        backgroundColor: 'background.default', // Theme color
      }}
    >
      <Alert 
        severity="error" 
        sx={{ 
          justifyContent: 'center',
          '& .MuiAlert-message': {
            textAlign: 'center'
          }
        }}
      >
        <Typography variant="body1">
          Error: {message}
        </Typography>
      </Alert>
    </Box>
  );
};
