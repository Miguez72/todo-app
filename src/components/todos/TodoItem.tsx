/**
 * Todo Item Component - Individual todo item display with actions
 */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PersonIcon from '@mui/icons-material/Person';
import type { Todo, User } from '../../types';

interface TodoItemProps {
  todo: Todo;
  users: User[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  users,
  onEdit,
  onDelete,
  onToggleComplete
}) => {
  const theme = useTheme();

  /**
   * Get user name by ID
   */
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  /**
   * Handle completion toggle
   */
  const handleToggleComplete = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    onEdit(todo);
  };

  /**
   * Handle delete button click
   */
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Card
      elevation={1}
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          elevation: 3,
          transform: 'translateY(-2px)',
        },
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `4px solid ${todo.completed ? theme.palette.success.main : theme.palette.warning.main}`,
        opacity: todo.completed ? 0.8 : 1,
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Header with completion status and actions */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          {/* Completion Status */}
          <Tooltip title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}>
            <IconButton
              onClick={handleToggleComplete}
              size="small"
              sx={{
                color: todo.completed ? 'success.main' : 'warning.main',
                '&:hover': {
                  backgroundColor: todo.completed ? 'success.light' : 'warning.light',
                },
              }}
            >
              {todo.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
          </Tooltip>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Edit todo">
              <IconButton
                onClick={handleEdit}
                size="small"
                sx={{
                  color: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete todo">
              <IconButton
                onClick={handleDelete}
                size="small"
                sx={{
                  color: 'error.main',
                  '&:hover': { backgroundColor: 'error.light' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Todo Title */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontWeight: 500,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'text.secondary' : 'text.primary',
            lineHeight: 1.4,
          }}
        >
          {todo.title}
        </Typography>

        {/* Footer with user info and status chip */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {getUserName(todo.userId)}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              (ID: {todo.userId})
            </Typography>
          </Box>

          <Chip
            label={todo.completed ? 'Completed' : 'Pending'}
            size="small"
            color={todo.completed ? 'success' : 'warning'}
            variant="outlined"
            sx={{
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Todo ID for reference */}
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{
            mt: 1,
            display: 'block',
            textAlign: 'right',
            fontFamily: 'monospace',
          }}
        >
          #ID: {todo.id}
        </Typography>
      </CardContent>
    </Card>
  );
};