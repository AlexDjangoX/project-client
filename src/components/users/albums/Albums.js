import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../globalContext/globalContext';
import { Typography, Box } from '@mui/material';
import styles from './Albums.module.css';
import client from '../../../utils/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Albums = () => {
  const { appData, fetchDataFromDB, loggedInUser, videoData, setVideoData } =
    useContext(Context);
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
      await client.post(`/albums/${loggedInUser.id}`, albumData);
      fetchDataFromDB(loggedInUser.id);
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

  const fetchYouTubeData = async () => {
    setVideoData([]);
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/mvid.php?i=${appData.artists[0].idArtist}`
    );
    const data = await response.json().catch((error) => console.error(error));

    const videos = data.mvids.map((item) => {
      return {
        artist: item.idArtist,
        album: item.idAlbum,
        trackName: item.strTrack,
        trackThumb: item.strTrackThumb,
        youTubeUrl: item.strMusicVid,
      };
    });

    if (data) setVideoData(videos);
  };

  useEffect(() => {
    setIsLoading(true);
    if (appData) {
      fetchAlbumData();
      fetchYouTubeData();
    }
    setIsLoading(false);
  }, [appData]);

  return (
    <>
      <Box>
        {!albumArt && (
          <h3>Navigate Back to Search. Search for Artist. Select Album Art</h3>
        )}
        {isLoading && albumArt && (
          <Box className={styles['left-search-bar']}></Box>
        )}
      </Box>

      <Box className={styles.wrapper}>
        <Box className={styles['album-covers']}>
          <ul className={styles['auto-fit-column']}>
            {albumArt &&
              albumArt.album.map((album, index) => (
                <li key={album.strAlbumThumb}>
                  <Typography>{` ${album.strAlbum.slice(0, 15)}`}</Typography>
                  <Box className={styles.box}>
                    <img
                      src={album.strAlbumThumb}
                      alt={album.strArtistStripped}
                      width='100%'
                      height='100%'
                    />
                  </Box>

                  <button
                    className={styles['delete-btn']}
                    onClick={() => postAlbumToDbAndFetch(album)}
                  >
                    Add to Favorites
                  </button>
                </li>
              ))}
          </ul>
        </Box>
        <div className={styles['song-list']}>
          <ul>
            {videoData &&
              videoData.map((video, index) => {
                return (
                  <li key={video.trackName} id={index}>
                    <Typography variant='h6'>
                      <div
                        className={styles['song-list-items']}
                        spacing={1}
                        direction='column'
                        m={4}
                      >
                        <Link
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                            '&:hover': {
                              color: 'red',
                            },
                          }}
                          to='/video/'
                          state={video.youTubeUrl.replace('watch?v=', 'embed/')}
                        >
                          {video.trackName}
                        </Link>
                      </div>
                    </Typography>
                  </li>
                );
              })}
          </ul>
        </div>
      </Box>
    </>
  );
};

export default Albums;
