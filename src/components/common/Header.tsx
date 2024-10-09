import { FC, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Avatar } from '@mui/material';

import ThemeToggleButton from './ThemeToggleButton';

import { useThemeContext } from '../../context/ThemeContext';
import { ADD_CARD, SEARCH, SEARCH_TEXT, TASK_BOARD, USER_AVATAR } from '../../constants';

const Header: FC = () => {
  const { isDarkMode } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [randomAvatar, setRandomAvatar] = useState<string>('');

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    setRandomAvatar(`https://i.pravatar.cc/150?img=${randomNumber}`);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: isDarkMode ? '#333' : '#fff', padding: '8px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: isDarkMode ? '#fff' : '#000', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          {TASK_BOARD}
        </Typography>

        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <TextField
            variant="outlined"
            placeholder={SEARCH_TEXT}
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ backgroundColor: isDarkMode ? '#444' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '8px' }}>
            {SEARCH}
          </Button>
        </form>

        <ThemeToggleButton />
        
        <Button
          color="inherit"
          sx={{
            marginLeft: '16px',
            display: { xs: 'none', sm: 'inline' },
            color: isDarkMode ? '#fff' : '#000',
            backgroundColor: isDarkMode ? '#444' : '#fff',
            '&:hover': {
              backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
            },
          }}
        >
          {ADD_CARD}
        </Button>

        <IconButton color="inherit" sx={{ marginLeft: '16px' }}>
          <Avatar alt={USER_AVATAR} src={randomAvatar} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
