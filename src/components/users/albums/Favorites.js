import React, { useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import client from '../../../utils/client';
import { Typography } from '@mui/material';

import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites, loggedInUser, fetchDataFromDB } = useContext(Context);

  const deleteHandler = async (event, id) => {
    event.preventDefault();

    try {
      await client.delete(`/albums/${id}`);
      fetchDataFromDB(loggedInUser.id);
    } catch (error) {
      console.error(error);
    }
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
      <ul className={styles['auto-fit-column']}>
        {favorites &&
          favorites.map((item, index) => (
            <li key={item} id={index}>
              <Typography>{`${item.strArtist}  `}</Typography>
              <Typography>{` ${item.strAlbum.slice(0, 28)}`}</Typography>
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
    </>
  );
};

export default Favorites;
