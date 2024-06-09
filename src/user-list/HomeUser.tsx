import { Button, Typography } from '@mui/material';
import './HomeUser.css';
import '../home-page-home/HomeLogo.css';
import * as React from 'react';
import HomeLogo from '../home-page-home/HomeLogo.jpg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useState } from 'react';

function HomeUser() {
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
    <div>
      <form className="HomeBook">
        <img src={HomeLogo} alt="Logo" className="homelogo" />
        <Typography variant="h3" component="h2">
          What do you want to do with users?
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => handleMenuItemClick('/home/3/create')}
        >
          Add
        </Button>
        <Button variant="contained" startIcon={<PersonRemoveIcon />}>
          Delete
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonSearchIcon />}
          onClick={() => handleMenuItemClick('')}
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default HomeUser;
