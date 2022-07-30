import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import Button from '@mui/material/Button';
import styles from './Albums.module.css';
import client from '../../../utils/client';

const tset = {
  userId: 2,
  id_album: '2116681',
  id_artist: '111258',
  year_released: '1976',
  str_album: 'Arrival',
  album_thumb:
    'https://www.theaudiodb.com/images/media/album/thumb/iepgyh1598422755.jpg',
  str_artist: 'ABBA',
  description: 'Arrival is the fourth stu',
  genre: 'Pop',
  review_score: 0,
};
const Albums = () => {
  const { appData, favorites, setFavorites, loggedInUser } =
    useContext(Context);
  const id = loggedInUser.id;
  const [albumArt, setAlbumArt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [youTubeUrl, setYouTubeUrl] = useState('');

  const saveAlbumToDbAndUpdateFavoritesArray = (album) => {
    const albumData = {
      userId: loggedInUser.id,
      id_album: album.idAlbum,
      id_artist: album.idArtist,
      year_released: album.intYearReleased,
      str_album: album.strAlbum,
      album_thumb: album.strAlbumThumb,
      str_artist: album.strArtist,
      description: album.strDescriptionEN?.slice(0, 50),
      genre: album.strGenre,
      review_score: 0,
      my_review: 'Brilliant',
    };
    let favorite = album.strAlbumThumb;
    console.log('FAVORITES : ', favorite);
    try {
      client.post(`/albums/${id}`, albumData);
      if (!favorites.includes(favorite))
        setFavorites(() => [...favorites, favorite]);
    } catch (error) {
      console.error(error);
    }
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
          albumArt.album.map((album, index) => (
            <>
              <li key={index * 2}>
                <div className={styles.box}>
                  <div className={styles['add-to-favorites-btn']}>
                    <Button
                      onClick={() =>
                        saveAlbumToDbAndUpdateFavoritesArray(album)
                      }
                    >
                      Add to Favorites
                    </Button>
                  </div>
                  <img
                    src={album.strAlbumThumb}
                    alt={album.strArtistStripped}
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
