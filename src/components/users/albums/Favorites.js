import React, { useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import Button from '@mui/material/Button';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useContext(Context);
  console.log('FAVORITES : ', favorites);
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
