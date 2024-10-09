import React from 'react';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        backgroundColor: isDarkMode ? '#555' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderRadius: '50%',
        padding: '8px',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
          backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
        },
      }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
