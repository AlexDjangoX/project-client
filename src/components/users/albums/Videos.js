import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../globalContext/globalContext';
import styles from './Videos.module.css';
import { useParams } from 'react-router-dom';

const Videos = () => {
  const { appData, favorites } = useContext(Context);
  const [youTubeUrl, setYouTubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  console.log('FAVORITES : ', favorites);
  console.log('APP_DATA :  ', appData);
  const fetchYouTubeData = async () => {
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/523532/mvid.php?i=${appData.artists[0].idArtist}`
    );
    const data = await response.json().catch((error) => console.log(error));
    const videos = data.mvids.map((item) => {
      return {
        artist: item.idArtist,
        album: item.idAlbum,
        trackName: item.strTrack,
        trackThumb: item.strTrackThumb,
        youTubeUrl: item.strMusicVid,
      };
    });
    console.log('VIDEOS : ', videos);
    if (data)
      setYouTubeUrl(data.mvids[1].strMusicVid.replace('watch?v=', 'embed/'));
  };

  useEffect(() => {
    setIsLoading(true);
    if (appData) {
      fetchYouTubeData();
    }
    setIsLoading(false);
  }, [appData]);

  return (
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
  );
};

export default Videos;
