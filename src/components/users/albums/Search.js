import React, { useEffect, useState, useContext } from 'react';
import useDebounce from '../../../utils/debounce';
import { Context } from '../../globalContext/globalContext';

import { Stack, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.css';

const Search = () => {
  const { setAppData, setIdArtist } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    </>
  );
};

export default Search;
