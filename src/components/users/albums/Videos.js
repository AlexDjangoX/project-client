import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import styles from './Videos.module.css';
import { Context } from '../../globalContext/globalContext';

const Videos = () => {
  const { appData } = useContext(Context);

  const location = useLocation();
  const youTubeUrl = location.state;
  return (
    <>
      <Box className={styles['logo-image']}>
        <img
          src={appData.artists[0].strArtistLogo}
          alt={appData.artists[0].strArtist}
        />
      </Box>
      <Box className={styles['video-wrapper']}>
        <Box className={styles['video-wrapper']}>
          {youTubeUrl && (
            <iframe
              width='853'
              height='480'
              src={youTubeUrl}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
            />
          )}
        </Box>
        ;
      </Box>
    </>
  );
};

export default Videos;
