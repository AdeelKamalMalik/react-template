import React, { FC, useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';

import { User } from '../../types';
import ThemeToggleButton from './ThemeToggleButton';
import { useAuth } from '../../context/AuthContext';
import { useTaskContext } from '../../context/TaskContext';
import { useThemeContext } from '../../context/ThemeContext';
import { ADD_CARD, SEARCH, SEARCH_TEXT, TASK_BOARD,  LOGOUT } from '../../constants';

const Header: FC = () => {
  const { logout } = useAuth()
  const { isDarkMode } = useThemeContext();
  const { setSearchTerm, setOpenModal } = useTaskContext();

  const [user, setUser] = useState<User | null>(null);
  const [userInitials, setUserInitials] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.firstName && storedUser.lastName) {
      setUser(storedUser);

      const initials = `${storedUser.firstName.charAt(0)}${storedUser.lastName.charAt(0)}`;
      setUserInitials(initials.toUpperCase());
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
    window.location.reload();
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

          {user && <Button
            color="inherit"
            sx={{
              marginLeft: '16px',
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              color: isDarkMode ? '#fff' : '#000',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              '&:hover': {
                backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
              },
            }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon sx={{ marginRight: '8px' }} />
            {ADD_CARD}
          </Button>}
        </Typography>

        {user && <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
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
        </form>}

        <ThemeToggleButton />

        {user && (
          <>
            <Typography sx={{ marginLeft: '16px', color: isDarkMode ? '#fff' : '#000' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <IconButton color="inherit" onClick={handleAvatarClick} sx={{ marginLeft: '16px' }}>
              <Avatar>{userInitials}</Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>{LOGOUT}</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
