/**
 * TodoTableHeader Component - Theme-based table header
 */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export const TodoTableHeader: React.FC = () => {
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
      <Typography
        variant="h3"
        sx={{
          color: 'tertiary.main', // Using theme color
          fontSize: { xs: '16px', sm: '20px' }, // Responsive font size
          letterSpacing: '0.5px',
          textAlign: 'left',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        USER ID
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          color: 'tertiary.main',
          fontSize: { xs: '16px', sm: '20px' },
          letterSpacing: '0.5px',
          textAlign: 'left',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        TITLE
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          color: 'tertiary.main',
          fontSize: { xs: '16px', sm: '20px' },
          letterSpacing: '0.5px',
          textAlign: 'right',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        STATUS
      </Typography>
    </Box>
  );
};
