import { FC, useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Avatar, Box } from '@mui/material';

import ThemeToggleButton from './ThemeToggleButton';

import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import { ADD_CARD, SEARCH, SEARCH_TEXT, TASK_BOARD, USER_AVATAR } from '../../constants';

const Header: FC = () => {
  const { isDarkMode } = useThemeContext();
  const { setSearchTerm, setOpenModal } = useTaskContext();
  const [randomAvatar, setRandomAvatar] = useState<string>('');

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    setRandomAvatar(`https://i.pravatar.cc/150?img=${randomNumber}`);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Set search term directly
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: isDarkMode ? '#333' : '#fff', padding: '8px' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            color: isDarkMode ? '#fff' : '#000',
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          {TASK_BOARD}

          <Button
            color="inherit"
            sx={{
              marginLeft: '16px',
              display: { xs: 'none', sm: 'inline-flex' }, // Use inline-flex to align items
              alignItems: 'center', // Vertically center the icon and text
              color: isDarkMode ? '#fff' : '#000',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              '&:hover': {
                backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
              },
            }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon sx={{ marginRight: '8px' }} /> {/* Add margin to space the icon and text */}
            {ADD_CARD}
          </Button>

        </Typography>


        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <TextField
            variant="outlined"
            placeholder={SEARCH_TEXT}
            onChange={handleSearchChange}
            size="small"
            sx={{ backgroundColor: isDarkMode ? '#444' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '8px' }}>
            {SEARCH}
          </Button>
        </form>

        <ThemeToggleButton />

        <IconButton color="inherit" sx={{ marginLeft: '16px' }}>
          <Avatar alt={USER_AVATAR} src={randomAvatar} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
