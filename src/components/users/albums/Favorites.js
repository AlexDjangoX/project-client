import React, { useContext } from 'react';
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
  const {
    favorites,
    loggedInUser,
    fetchDataFromDB,
    componentState,
    setComponentState,
    uniqueByArtistStr,
  } = useContext(Context);

  const deleteHandler = async (event, id) => {
    event.preventDefault();
    console.log('FAVORITES : ', favorites);
    try {
      await client.delete(`/albums/${id}`);
      fetchDataFromDB(loggedInUser.id);
      setComponentState(favorites);
    } catch (error) {
      console.error(error);
    }
    console.log('COMPONENT STATE : ', componentState);
  };

  const handleFilter = (artist) => {
    setComponentState(favorites);
    const filtered = favorites.filter((item) => item.strArtist === artist);
    setComponentState(filtered);
  };

  return (
    <>
      <div>
        {!favorites && (
          <h3>
            Navigate Back to Search. Search for Artist. Select Album Art. Choose
            Favorites
          </h3>
        )}
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles['radio-btn']}>
          <Box>
            <FormControl>
              <FormLabel id='fav-albums-group-label'>
                Select Albums Display
              </FormLabel>
              <RadioGroup
                name='favorite-albums'
                aria-labelledby='fav-albums-group-label'
              >
                {uniqueByArtistStr &&
                  uniqueByArtistStr.map((item, index) => (
                    <FormControlLabel
                      control={<Radio />}
                      label={`${item}`}
                      value={`${item}`}
                      onClick={() => handleFilter(`${item}`)}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </div>
        <div className={styles['album-covers']}>
          <ul className={styles['auto-fit-column']}>
            {componentState &&
              componentState.map((item, index) => (
                <li key={item} id={index}>
                  <Typography>{`${item.strArtist}  `}</Typography>
                  <Typography>{` ${item.strAlbum.slice(0, 16)}`}</Typography>
                  <div className={styles.box}>
                    <img
                      src={item.strAlbumThumb}
                      alt={item.strAlbumThumb.slice(0, 2)}
                      width='100%'
                      height='100%'
                    />
                  </div>
                  <button
                    className={styles['delete-btn']}
                    onClick={(event) =>
                      deleteHandler(event, item.id, fetchDataFromDB)
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Favorites;
