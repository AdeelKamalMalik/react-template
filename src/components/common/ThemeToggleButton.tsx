import { FC } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggleButton: FC = () => {
  const { toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
