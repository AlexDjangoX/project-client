import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles['main-header']}>
      <div className={styles['left-nav']}></div>
      <div className={styles['main-heading']}>
        <h1>Love Music App</h1>
        <p>For those who remember vinyl</p>
      </div>
      <div className={styles['right-nav']}>
        <Button variant='outlined' color='primary'>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            Favorites
          </Link>
        </Button>

        <Button variant='outlined' color='primary'>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            Album Art
          </Link>
        </Button>

        <Button variant='outlined' color='primary'>
          <Link
            to='/'
            color='black'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Back to Search
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
