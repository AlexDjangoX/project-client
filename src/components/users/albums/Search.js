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
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.css';
import {
  SettingsInputComponent,
  SettingsPowerRounded,
} from '@material-ui/icons';

const Search = () => {
  const { appData, setAppData, setIdArtist } = useContext(Context);
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
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${query}`
    );

    const data = await response.json().catch((error) => console.error(error));

    if (data) {
      setAppData(data);
      setIdArtist(data.artists[0].idArtist);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (debouncedSearch) fetchDataFromApi(debouncedSearch);
  }, [debouncedSearch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };
  console.log(appData);
  return (
    <>
      <div className={styles['search-bar-wrapper']}>
        <div className={styles['search-bar-left']}>
          {isLoading && searchQuery && (
            <div className={styles['left-search-bar']}>
              <Stack spacing={2}>
                <CircularProgress color='success' />
              </Stack>
            </div>
          )}
        </div>
        <div className={styles['search-bar']}>
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
        </div>
        <div className={styles['search-bar-right']}>
          {isLoading && searchQuery && (
            <div className={styles['right-search-bar']}>
              <Stack spacing={2}>
                <CircularProgress />
              </Stack>
            </div>
          )}
        </div>
      </div>
      {appData && (
        <>
          <Box sx={{ textAlign: 'center' }} pt={2}>
            <Button onClick={() => setOpen(true)}>Read Biography</Button>
          </Box>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ height: '8vh', display: 'grid', placeItems: 'centre' }}
            >
              <Typography variant='h3'>
                {appData.artists[0].strArtist}
              </Typography>
            </Grid>

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
    </>
  );
};

export default Search;
