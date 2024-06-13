import { Typography } from '@mui/material';
import './HomePageHome.css';
import './HomeLogo.css';
import * as React from 'react';
import HomeLogo from './HomeLogo.jpg';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <form className="HomePageHome">
        <img src={HomeLogo} alt="Logo" className="homelogo" />
        <Typography variant="h3" component="h2">
          {t('welcome')}
        </Typography>
      </form>
    </div>
  );
}

export default HomePage;
