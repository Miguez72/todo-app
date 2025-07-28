/**
 * Footer Component - Pixel-perfect match to screenshot
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.blue.dark, // Exact dark blue from screenshot
        color: COLORS.background, // Pure white text
        height: '187px', // Exact height from design specification
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        padding: '0', // Remove horizontal padding to eliminate offset
        marginTop: 'auto',
        width: '100%',
        borderRadius: '0 !important', // Sharp corners
        boxShadow: 'none', // No shadow

        // Mobile responsive
        '@media (max-width: 768px)': {
          padding: '0',
          height: '150px', // Slightly smaller on mobile
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '14px', // Exact font size from screenshot
          lineHeight: 1.5, // Good line height for readability
          textAlign: 'center', // Center text horizontally
          fontFamily: 'Karbon, sans-serif',
          fontWeight: 400, // Regular weight
          color: COLORS.background,
          width: '100%', // Take full width
          letterSpacing: '0.02em', // Slight letter spacing for better readability
          wordSpacing: '0.1em', // Slight word spacing for better balance
          padding: '0 20px', // Minimal side padding
          display: 'block', // Ensure block display for proper centering
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
      </Typography>
    </Box>
  );
};