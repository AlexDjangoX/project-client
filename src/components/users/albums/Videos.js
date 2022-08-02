import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Videos.module.css';

const Videos = () => {
  const location = useLocation();
  const youTubeUrl = location.state;
  return (
    <div className={styles['video-wrapper']}>
      <div className={styles['video-wrapper']}>
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
      </div>
      ;
    </div>
  );
};

export default Videos;
