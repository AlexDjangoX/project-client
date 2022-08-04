import React, { useContext, useState } from 'react';
import { Context } from '../../globalContext/globalContext';
import client from '../../../utils/client';
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites, loggedInUser, fetchDataFromDB, setComponentState } =
    useContext(Context);
  const [artistFilter, setArtistFilter] = useState('');
  const [displayAll, setDisplayAll] = useState(true);

  const deleteHandler = async (event, id) => {
    event.preventDefault();
    try {
      await client.delete(`/albums/${id}`);
      await fetchDataFromDB(loggedInUser.id);
      setComponentState(favorites);
    } catch (error) {
      console.error(error);
    }
  };

  let uniqueByArtistStr = [];

  favorites.forEach((item) => {
    if (!uniqueByArtistStr.includes(item.strArtist)) {
      uniqueByArtistStr.push(item.strArtist);
    }
  });

  const filterByArtist = (artist) => {
    let filtered = favorites.filter((album) => {
      if (artist === '1') return true;
      return album.strArtist === artist;
    });
    if (displayAll) {
      filtered = favorites;
      return filtered;
    }
    return filtered;
  };

  const handleFilter = (artist) => {
    setDisplayAll(false);
    setArtistFilter(artist);
  };

  const albumsToRender = filterByArtist(artistFilter);

  return (
    <>
      <Box>
        {!favorites && (
          <h3>
            Navigate Back to Search. Search for Artist. Select Album Art. Choose
            Favorites
          </h3>
        )}
      </Box>
      <Box className={styles['component-wrapper']}>
        <Box className={styles['radio-btn']}>
          <Box>
            <FormControl>
              <FormLabel id='fav-albums-group-label'>
                Select Albums Display
              </FormLabel>
              <RadioGroup
                name='favorite-albums'
                aria-labelledby='fav-albums-group-label'
              >
                <FormControlLabel
                  key='1'
                  control={<Radio />}
                  label='All Albums'
                  value='1'
                  // checked={displayAll}
                  onClick={() => handleFilter('1')}
                />
                {uniqueByArtistStr &&
                  uniqueByArtistStr.map((item, index) => (
                    <FormControlLabel
                      key={`${item + index}`.slice(0, 6)}
                      control={<Radio />}
                      label={`${item.slice(0, 14)}`}
                      value={`${item}`}
                      onClick={() => handleFilter(`${item}`)}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box className={styles['album-covers']}>
          <ul className={styles['auto-fit-column']}>
            {albumsToRender.map((item, index) => {
              return (
                <li key={item.idAlbum + index} id={index}>
                  <Typography>{`${item.strArtist}  `}</Typography>
                  <Typography>{` ${item.strAlbum.slice(0, 16)}`}</Typography>
                  <Box className={styles.box}>
                    <img
                      src={item.strAlbumThumb}
                      alt={item.strAlbumThumb.slice(0, 2)}
                      width='100%'
                      height='100%'
                    />
                  </Box>
                  <button
                    className={styles['delete-btn']}
                    onClick={(event) =>
                      deleteHandler(event, item.id, fetchDataFromDB)
                    }
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </Box>
      </Box>
    </>
  );
};

export default Favorites;
