import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  BottonGroup,
  Stack,
  Avatar,
  Box,
  ButtonGroup,
} from '@mui/material';
import styles from './Header.module.css';
import { Context } from '../../globalContext/globalContext';

const Header = () => {
  const { loggedInUser } = useContext(Context);
  return (
    <Box className={styles['main-header']}>
      <Box className={styles['left-nav']}>
        <Stack>
          <Avatar
            src={`${loggedInUser.profile_url}`}
            alt={`${loggedInUser.first_name}`}
            sx={{ width: 120, height: 120 }}
          ></Avatar>
        </Stack>
      </Box>
      <Box className={styles['main-heading']}>
        <h1>Virtual Vinyl Vault </h1>
        <p>For those who remember vinyl</p>
      </Box>
      <Box className={styles['right-nav']}>
        <Stack direction='column'>
          <ButtonGroup
            variant='outlined'
            color='primary'
            orientation='vertical'
            style={{ background: 'gray', color: 'white' }}
            arial-label='navigation button group'
          >
            <Button>
              <Link
                to='/favorites'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Favorites
              </Link>
            </Button>

            <Button>
              <Link
                to='/albums'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Albums
              </Link>
            </Button>

            <Button>
              <Link
                to='/home'
                color='black'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Back to Search
              </Link>
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
