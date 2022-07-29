import React, { useState, useEffect } from 'react';
import Header from './Header';
import Button from '@mui/material/Button';
import styles from './Favorites.module.css';

const Favorites = ({ favoriteAlbumArt, setFavoriteAlbumArt }) => {
  return (
    <>
      <Header />
      <div>
        {!favoriteAlbumArt && (
          <h3>
            Navigate Back to Search. Search for Artist. Select Album Art. Choose
            Favorites
          </h3>
        )}
      </div>
      <ul className={styles['auto-fit-column']}>
        {favoriteAlbumArt &&
          favoriteAlbumArt.map((item, index) => (
            <>
              <li key={index} id={index}>
                <div className={styles.box}>
                  <div className={styles['delete-btn']}>
                    <Button variant='contained'>Remove</Button>
                  </div>
                  <img
                    src={item}
                    alt={item.slice(0, 5)}
                    width='100%'
                    height='100%'
                  />
                </div>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

export default Favorites;
