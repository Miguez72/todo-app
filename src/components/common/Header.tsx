/**
 * Header Component - Pixel-perfect match to screenshot
 */
import React from 'react';
import { Box } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#644C79', // Updated to exact color from reference
        height: '60px', // Exact height
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '40px',
        paddingRight: '40px',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderRadius: '0 !important', // No rounded corners
        boxShadow: 'none', // No shadow
      }}
    >
      {/* Aalto IT Logo */}
      <Box
        component="img"
        src="/src/assets/aalto_it.png"
        alt="Aalto IT"
        sx={{
          height: '32px', // Exact logo height from screenshot
          width: 'auto',
          filter: 'brightness(0) invert(1)', // Make logo white
          fontFamily: 'Karbon, sans-serif',
        }}
      />
    </Box>
  );
};