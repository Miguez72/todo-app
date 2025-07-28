/**
 * Styled components for TodoTable using theme system
 */
import { styled, Box } from '@mui/material';

export const TableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  overflow: 'hidden',
  minHeight: '400px',
  boxShadow: 'none',
  border: 'none',
  padding: theme.spacing(2.5, 2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.875),
  },
}));

export const TableHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '80px 1fr 120px',
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${theme.palette.tertiary.main}`,
  padding: theme.spacing(2.5, 3.75),
  gap: theme.spacing(2.5),
  height: '60px',
  alignItems: 'center',
  marginBottom: theme.spacing(2.5),
}));

export const TableRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '80px 1fr 120px',
  padding: theme.spacing(3.125, 3.75),
  gap: theme.spacing(2.5),
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  height: '70px',
  cursor: 'pointer',
  marginBottom: theme.spacing(1.875),
  borderRadius: 0,
  border: 'none',
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(3.75),
  gap: theme.spacing(1.25),
}));

export const PaginationButton = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(1, 1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const PaginationNumber = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.tertiary.main : 'transparent',
  color: active ? theme.palette.background.default : theme.palette.text.primary,
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing(1, 1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: active ? theme.palette.tertiary.main : theme.palette.action.hover,
  },
}));
