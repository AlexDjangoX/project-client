import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import Button from '@mui/material/Button';
import styles from './Albums.module.css';
import client from '../../../utils/client';
import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const { appData, setFavorites, loggedInUser } = useContext(Context);
  const id = loggedInUser.id;
  const [albumArt, setAlbumArt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const postAlbumToDbAndFetch = async (album) => {
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

    try {
      client.post(`/albums/${id}`, albumData);
      const response = await client.get(`/albums/${id}`);
      const data = await response.data.data.albums.map((item) => item.album);
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlbumData = async () => {
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/album.php?i=${appData.artists[0].idArtist}`
    );
    const data = await response.json().catch((error) => console.error(error));
    if (data) setAlbumArt(data);
  };

  useEffect(() => {
    setIsLoading(true);
    if (appData) {
      fetchAlbumData();
    }
    setIsLoading(false);
  }, [appData]);

  const routeToYouTube = (id) => {
    navigate('/videos/' + id);
  };

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
            <li key={album.strAlbumThumb}>
              <div className={styles.box}>
                <div className={styles['add-to-favorites-btn']}>
                  <Button onClick={() => postAlbumToDbAndFetch(album)}>
                    Add to Favorites
                  </Button>
                  <Button onClick={() => routeToYouTube(album.idAlbum)}>
                    You tube
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
          ))}
      </ul>
    </>
  );
};

export default Albums;
