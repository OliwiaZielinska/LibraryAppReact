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
import { useTranslation } from 'react-i18next';

function HomeUser() {
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
    <div>
      <form className="HomeUser">
        <img src={HomeLogo} alt="Logo" className="homelogo" />
        <Typography variant="h3" component="h2">
          {t('userWhatDoYouDo')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => handleMenuItemClick('/home/3/create')}
        >
          {t('add')}
        </Button>
        <Button variant="contained" startIcon={<PersonRemoveIcon />}>
          {t('delete')}
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonSearchIcon />}
          onClick={() => handleMenuItemClick('')}
        >
          {t('search')}
        </Button>
      </form>
    </div>
  );
}

export default HomeUser;
