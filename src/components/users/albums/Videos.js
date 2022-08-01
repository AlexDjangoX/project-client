import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../globalContext/globalContext';

import styles from './Videos.module.css';
import { useParams } from 'react-router-dom';

const Videos = () => {
  const { appData, favorites } = useContext(Context);
  // console.log('APP DATA : ', appData);

  // const [isLoading, setIsLoading] = useState(false);
  // const params = useParams();

  // setYouTubeUrl(data.mvids[1].strMusicVid.replace('watch?v=', 'embed/'));

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (appData) {
  //     fetchYouTubeData();
  //   }
  //   setIsLoading(false);
  // }, [appData]);
  // console.log('VIDEO DATA : D', videoData[0]);

  return <div className={styles['video-wrapper']}></div>;
};

export default Videos;

// <div className={styles['video-wrapper']}>
//   {videoData && (
//     <iframe
//       width='853'
//       height='480'
//       src={youTubeUrl}
//       frameBorder='0'
//       allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//       allowFullScreen
//       title='Embedded youtube'
//     />
//   )}
// </div>;
