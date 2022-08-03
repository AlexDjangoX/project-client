import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Avatar } from '@mui/material';
import styles from './Header.module.css';
import { Context } from '../../globalContext/globalContext';

const Header = () => {
  const { loggedInUser } = useContext(Context);
  return (
    <div className={styles['main-header']}>
      <div className={styles['left-nav']}>
        <Stack>
          <Avatar
            src={`${loggedInUser.profile_url}`}
            alt={`${loggedInUser.first_name}`}
            sx={{ width: 120, height: 120 }}
          ></Avatar>
        </Stack>
      </div>
      <div className={styles['main-heading']}>
        <h1>Virtual Vinyl Vault </h1>
        <p>For those who remember vinyl</p>
      </div>
      <div className={styles['right-nav']}>
        <Button variant='outlined' color='primary'>
          <Link
            to='/favorites'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Favorites
          </Link>
        </Button>

        <Button variant='outlined' color='primary'>
          <Link to='/albums' style={{ textDecoration: 'none', color: 'black' }}>
            Albums
          </Link>
        </Button>

        <Button variant='outlined' color='primary'>
          <Link
            to='/home'
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
