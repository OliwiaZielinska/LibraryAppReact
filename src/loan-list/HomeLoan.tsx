import { Button, Typography } from '@mui/material';
import './HomeLoan.css';
import '../home-page-home/HomeLogo.css';
import * as React from 'react';
import HomeLogo from '../home-page-home/HomeLogo.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

function HomeLoan() {
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
      <form className="HomeBook">
        <img src={HomeLogo} alt="Logo" className="homelogo" />
        <Typography variant="h3" component="h2">
          {t('loanWhatDoYouDo')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => handleMenuItemClick('/home/2/create')}
        >
          {t('add')}
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />}>
          {t('delete')}
        </Button>
        <Button
          variant="contained"
          startIcon={<ContentPasteSearchIcon />}
          onClick={() => handleMenuItemClick('/home/2/search')}
        >
          {t('search')}
        </Button>
      </form>
    </div>
  );
}

export default HomeLoan;
