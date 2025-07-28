/**
 * Footer Component - Using theme-based styling
 */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export const Footer: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.tertiary.dark,
        color: theme.palette.background.default,
        height: { xs: '150px', sm: '187px' }, // Responsive height using theme breakpoints
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          width: '100%',
          letterSpacing: '0.02em',
          wordSpacing: '0.1em',
          px: { xs: 2.5, sm: 5 }, // Responsive padding using theme spacing
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
      </Typography>
    </Box>
  );
};