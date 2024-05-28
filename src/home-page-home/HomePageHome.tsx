import { Typography } from '@mui/material';
import './HomePageHome.css';
import './HomeLogo.css';
import * as React from 'react';
import HomeLogo from './HomeLogo.jpg';

function HomePage() {
  return (
    <div>
      <form className="HomePageHome">
        <img src={HomeLogo} alt="Logo" className="homelogo" />
        <Typography variant="h3" component="h2">
          Welcome in our library !
        </Typography>
      </form>
    </div>
  );
}

export default HomePage;
