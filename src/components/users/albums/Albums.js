import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import Button from '@mui/material/Button';
import styles from './Albums.module.css';

const Albums = () => {
  const { appData } = useContext(Context);
  const [albumArt, setAlbumArt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [youTubeUrl, setYouTubeUrl] = useState('');

  const updateFavoritesArray = (favorite) => {
    if (!favorites.includes(favorite)) console.log(favorites);
    setFavorites(() => [...favorites, favorite]);
  };

  const fetchAlbumData = async () => {
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/album.php?i=${appData.artists[0].idArtist}`
    );
    const data = await response.json().catch((error) => console.error(error));
    console.log('ALBUM_PHP : ', data);
    if (data) setAlbumArt(data);
  };

  const fetchYouTubeData = async () => {
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/mvid.php?i=${appData.artists[0].idArtist}`
    );
    const data = await response.json().catch((error) => console.log(error));
    console.log('MVID_PHP : ', data);
    if (data) setYouTubeUrl(data.mvids[0].strMusicVid);
  };

  useEffect(() => {
    setIsLoading(true);
    if (appData) fetchAlbumData();
    setIsLoading(false);
  }, [appData]);

  useEffect(() => {
    if (appData) fetchYouTubeData();
  }, [appData]);

  return (
    <>
      <div>
        {!albumArt && (
          <h3>Navigate Back to Search. Search for Artist. Select Album Art</h3>
        )}
        {isLoading && albumArt && (
          <div className={styles['left-search-bar']}></div>
        )}
      </div>
      <ul className={styles['auto-fit-column']}>
        {albumArt &&
          albumArt.album.map((item, index) => (
            <>
              <li key={index * 2}>
                <div className={styles.box}>
                  <div className={styles['add-to-favorites-btn']}>
                    <Button
                      onClick={() => updateFavoritesArray(item.strAlbumThumb)}
                    >
                      Add to Favorites
                    </Button>
                  </div>
                  <img
                    src={item.strAlbumThumb}
                    alt={item.strArtistStripped}
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

export default Albums;
