/**
 * Todo Edit Dialog Component - Modal for creating and editing todos
 */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { logger } from '../../utils/logger';
import { COLORS } from '../../constants';
import type { Todo, User } from '../../types';

interface TodoEditDialogProps {
  open: boolean;
  todo: Todo | null; // null for create mode
  users: User[];
  onClose: () => void;
  onSave: (todoData: Omit<Todo, 'id'>) => Promise<void>;
  loading?: boolean;
}

export const TodoEditDialog: React.FC<TodoEditDialogProps> = ({
  open,
  todo,
  users,
  onClose,
  onSave,
  loading = false
}) => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
    userId: 1
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isEditMode = todo !== null;

  /**
   * Initialize form data when dialog opens or todo changes
   */
  useEffect(() => {
    if (open) {
      if (isEditMode && todo) {
        setFormData({
          title: todo.title,
          completed: todo.completed,
          userId: todo.userId
        });
      } else {
        // Reset form for create mode
        setFormData({
          title: '',
          completed: false,
          userId: users.length > 0 ? users[0].id : 1
        });
      }
      setFormErrors({});
    }
  }, [open, todo, isEditMode, users]);

  /**
   * Handle form field changes
   */
  const handleFieldChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  /**
   * Handle title change
   */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('title', event.target.value);
  };

  /**
   * Handle completion status toggle for button
   */
  const handleCompletedToggle = () => {
    handleFieldChange('completed', !formData.completed);
  };

  /**
   * Handle user ID change
   */
  const handleUserIdChange = (event: SelectChangeEvent<number>) => {
    handleFieldChange('userId', Number(event.target.value));
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    } else if (formData.title.trim().length > 200) {
      errors.title = 'Title must not exceed 200 characters';
    }

    if (!formData.userId) {
      errors.userId = 'User selection is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      await onSave({
        title: formData.title.trim(),
        completed: formData.completed,
        userId: formData.userId
      });
      onClose();
    } catch (error) {
      logger.error('Error saving todo:', error);
      setFormErrors({
        submit: error instanceof Error ? error.message : 'Failed to save todo'
      });
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };

  /**
   * Get user name by ID
   */
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 400,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" color="primary" fontWeight="bold">
          {isEditMode ? '✏️ Edit Todo' : '➕ Create New Todo'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEditMode ? 'Update the todo details below' : 'Fill in the details to create a new todo'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Submit Error Alert */}
        {formErrors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formErrors.submit}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title Field */}
          <TextField
            label="Todo Title"
            variant="outlined"
            fullWidth
            required
            value={formData.title}
            onChange={handleTitleChange}
            error={!!formErrors.title}
            helperText={formErrors.title || `${formData.title.length}/200 characters`}
            disabled={saving || loading}
            multiline
            rows={3}
            placeholder="Enter a descriptive title for your todo..."
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
              },
            }}
          />

          {/* User Selection */}
          <FormControl fullWidth required error={!!formErrors.userId}>
            <InputLabel>Assign to User</InputLabel>
            <Select
              value={formData.userId}
              onChange={handleUserIdChange}
              label="Assign to User"
              disabled={saving || loading || users.length === 0}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      User ID: {user.id}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {formErrors.userId && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {formErrors.userId}
              </Typography>
            )}
          </FormControl>

          {/* Completion Status */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Completion Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                component="button"
                onClick={handleCompletedToggle}
                disabled={saving || loading}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '40px',
                  backgroundColor: formData.completed ? COLORS.success : COLORS.error,
                  color: COLORS.background,
                  border: 'none',
                  borderRadius: '20px', // Rounded toggle
                  fontFamily: 'Karbon, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: saving || loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: saving || loading ? 0.6 : 1,
                  '&:hover': {
                    opacity: saving || loading ? 0.6 : 0.8,
                    transform: saving || loading ? 'none' : 'scale(1.02)',
                  },
                  '&:active': {
                    transform: saving || loading ? 'none' : 'scale(0.98)',
                  },
                }}
              >
                {formData.completed ? 'COMPLETED' : 'PENDING'}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {formData.completed 
                  ? 'This todo is marked as completed' 
                  : 'This todo is still pending completion'
                }
              </Typography>
            </Box>
          </Box>

          {/* Preview */}
          <Box
            sx={{
              p: 2,
              backgroundColor: 'grey.50',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Preview:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontStyle: formData.title.trim() ? 'normal' : 'italic',
                color: formData.title.trim() ? 'text.primary' : 'text.disabled',
                textDecoration: formData.completed ? 'line-through' : 'none',
              }}
            >
              {formData.title.trim() || 'Enter a title to see preview...'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Assigned to: {getUserName(formData.userId)} • Status: {formData.completed ? 'Completed' : 'Pending'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          disabled={saving}
          startIcon={<CancelIcon />}
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || !formData.title.trim()}
          startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
          sx={{ textTransform: 'none', minWidth: 120 }}
        >
          {saving ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};