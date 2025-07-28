/**
 * Main App Component - Entry point for the Todo Management Application
 */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TodoPage } from './pages/TodoPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { theme as appTheme } from './theme';

/**
 * Main App Component
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={appTheme}>
        {/* CssBaseline provides consistent styling across browsers */}
        <CssBaseline />
        
        {/* Main Todo Application */}
        <TodoPage />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;