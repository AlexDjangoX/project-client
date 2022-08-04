import React, { useEffect, useState, useContext } from 'react';
import useDebounce from '../../../utils/debounce';
import { Context } from '../../globalContext/globalContext';
import Carousel from '../carousel/Carousel';

import {
  Stack,
  CircularProgress,
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.css';

const Search = () => {
  const { appData, setAppData, setIdArtist, apiError, setApiError } =
    useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 1500);

  const inputChangeHandler = (event) => {
    const { value } = event.target;

    const formatValue = value.split(' ').join('_');
    setSearchQuery(formatValue);
  };

  const fetchDataFromApi = async (query) => {
    try {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${query}`
      );

      const data = await response.json().catch((error) => console.error(error));

      if (data && data.artists) {
        setAppData(data);
        setIdArtist(data.artists[0].idArtist);
      } else {
        setApiError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (debouncedSearch) fetchDataFromApi(debouncedSearch);
  }, [debouncedSearch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };

  return (
    <>
      <Box className={styles['search-bar-wrapper']}>
        <Box className={styles['search-bar-left']}>
          {isLoading && searchQuery && (
            <Box className={styles['left-search-bar']}>
              <Stack spacing={2}>
                <CircularProgress color='success' />
              </Stack>
            </Box>
          )}
        </Box>
        <Box className={styles['search-bar']}>
          <form className={styles.form} onSubmit={onSubmitHandler}>
            <input
              type='search'
              placeholder='Search'
              className={styles['search-field']}
              onChange={inputChangeHandler}
              value={searchQuery.split('_').join(' ')}
            />
            <button
              type='submit'
              className={styles['search-button']}
              onSubmit={onSubmitHandler}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </Box>
        <Box className={styles['search-bar-right']}>
          {isLoading && searchQuery && (
            <Box className={styles['right-search-bar']}>
              <Stack spacing={2}>
                <CircularProgress />
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
      {appData && (
        <>
          <Box sx={{ textAlign: 'center' }} pt={2}>
            <Button onClick={() => setOpen(true)}>Read Biography</Button>
          </Box>
          <Box className={styles['logo-image']}>
            <img
              src={appData.artists[0].strArtistLogo}
              alt={appData.artists[0].strArtist}
            />
          </Box>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ height: '1vh', display: 'grid', placeItems: 'centre' }}
            ></Grid>

            <Grid item xs={12} justifyContent='center'></Grid>
          </Grid>
          <Box>
            <Carousel />
          </Box>
          <Grid container my={50} mx={50}>
            <Grid item></Grid>
            <Grid item xs={6}>
              <Box>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <Box position='relative' top='20%' p={30}>
                    <Typography
                      bgcolor='#0F0F0F'
                      color='#D7D7D7'
                      p={4}
                      sx={{ fontSize: 17 }}
                      height={300}
                      overflow='scroll'
                    >
                      {appData.artists[0].strBiographyEN}
                    </Typography>
                    <Box sx={{ textAlign: 'center' }} p={3}>
                      <Button
                        variant='contained'
                        onClick={() => setOpen(false)}
                      >
                        Close Biography
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      {apiError && (
        <Box>
          <Alert severity='error' variant='outlined'>
            Please provide a valid name of Artist or Group
          </Alert>
        </Box>
      )}
    </>
  );
};

export default Search;
