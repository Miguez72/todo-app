/**
 * Title Filter Component - Text input that filters todos by title on Enter key
 */
import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TitleFilterProps {
  value: string;
  onFilter: (title: string) => void;
  placeholder?: string;
}

export const TitleFilter: React.FC<TitleFilterProps> = ({
  value,
  onFilter,
  placeholder = 'Search todos...'
}) => {
  // Local state for input value (only updates parent on Enter)
  const [inputValue, setInputValue] = useState(value);

  /**
   * Handle Enter key press to trigger filter
   */
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onFilter(inputValue.trim());
    }
  };

  /**
   * Handle input value changes
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Update local state when parent value changes (e.g., on reset)
   */
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
};