/**
 * Material-UI Theme Configuration
 * Centralized theme with component overrides and design tokens
 */
import { createTheme } from '@mui/material/styles';
import { COLORS, BREAKPOINTS } from '../constants';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      dark: string;
    };
  }
}

export const theme = createTheme({
  // Design tokens
  palette: {
    primary: {
      main: COLORS.primary, // #644C79
    },
    secondary: {
      main: COLORS.secondary, // #4A9EE7
    },
    success: {
      main: COLORS.success, // #4CAF50
    },
    error: {
      main: COLORS.error, // #FF6B6B
    },
    warning: {
      main: COLORS.warning, // #FF9800
    },
    background: {
      default: COLORS.background, // #FFFFFF
      paper: COLORS.container, // #F5F5F5
    },
    text: {
      primary: COLORS.text.primary, // #333333
      secondary: COLORS.text.secondary, // #666666
      disabled: COLORS.text.disabled, // #999999
    },
    tertiary: {
      main: COLORS.blue.primary, // #2E3A87
      dark: COLORS.blue.dark, // #1E3A8A
    },
  },

  // Typography system
  typography: {
    fontFamily: 'Karbon, sans-serif',
    h1: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h3: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1.3,
    },
    body2: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: 'Karbon, sans-serif',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 1.4,
    },
  },

  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: BREAKPOINTS.mobile,
      md: BREAKPOINTS.tablet,
      lg: BREAKPOINTS.desktop,
      xl: 1536,
    },
  },

  // Spacing scale
  spacing: 8, // 8px base unit

  // Component overrides
  components: {
    // Typography component defaults
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Karbon, sans-serif',
        },
      },
    },

    // Button component defaults
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Karbon, sans-serif',
          fontWeight: 600,
          borderRadius: '8px',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        containedPrimary: {
          backgroundColor: COLORS.primary,
          color: COLORS.background,
          '&:hover': {
            backgroundColor: COLORS.primary,
            opacity: 0.8,
          },
        },
      },
    },

    // Dialog component defaults
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          fontFamily: 'Karbon, sans-serif',
        },
      },
    },

    // TextField component defaults
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontFamily: 'Karbon, sans-serif',
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Karbon, sans-serif',
          },
        },
      },
    },

    // Table-like components (using Box)
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 0,
        },
      },
      variants: [
        {
          props: { variant: 'todoContainer' },
          style: {
            backgroundColor: COLORS.container,
            borderRadius: 0,
            overflow: 'hidden',
            minHeight: '400px',
            boxShadow: 'none',
            border: 'none',
          },
        },
        {
          props: { variant: 'todoItem' },
          style: {
            backgroundColor: COLORS.background,
            cursor: 'pointer',
            marginBottom: '15px',
            borderRadius: 0,
            border: 'none',
            borderBottom: `2px solid ${COLORS.blue.secondary}`,
            '&:hover': {
              backgroundColor: COLORS.gray.light,
            },
            '&:last-child': {
              marginBottom: 0,
            },
          },
        },
      ],
    },
  },
});

// Custom component variants
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    todoContainer: true;
    todoItem: true;
  }
}

export default theme;
