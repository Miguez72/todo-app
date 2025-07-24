/**
 * Main App Component - Entry point for the Todo Management Application
 */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TodoPage } from './pages/TodoPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#644C79',
      light: '#8B7AB8',
      dark: '#4A3D6B',
    },
    secondary: {
      main: '#4A9EE7',
    },
    background: {
      default: '#ffffff', // White app background like design
      paper: '#f5f5f5', // Gray for containers
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // Customize Material-UI components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
          },
        },
      },
    },
  },
});

/**
 * Main App Component
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides consistent styling across browsers */}
        <CssBaseline />
        
        {/* Main Todo Application */}
        <TodoPage />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;