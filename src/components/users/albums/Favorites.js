import React, { useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import Button from '@mui/material/Button';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useContext(Context);

  const uniqueAlbumObjects = (arrayOfObjects) => {
    const ids = arrayOfObjects.map((o) => o.id_album);
    const filtered = arrayOfObjects.filter(
      ({ id_album }, index) => !ids.includes(id_album, index + 1)
    );
    return filtered;
  };
  const albumsToRender = uniqueAlbumObjects(favorites);

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
        {albumsToRender &&
          albumsToRender.map((item, index) => (
            <li key={item} id={index}>
              <div className={styles.box}>
                <div className={styles['delete-btn']}>
                  <Button variant='contained'>Remove</Button>
                </div>
                <img
                  src={item.album_thumb}
                  alt={item.album_thumb.slice(0, 5)}
                  width='100%'
                  height='100%'
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Favorites;
