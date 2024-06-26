import React, { useState, useTransition } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export default function MenuAppBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('library')}
        </Typography>
        <Box>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('/home')}>
            {t('home')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/home/1')}>
            {t('book')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/home/2')}>
            {t('loan')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/home/3')}>
            {t('user')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
