import React, { useContext, useState } from 'react';
import styles from './Carousel.module.css';
import { Context } from '../../globalContext/globalContext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Carousel = () => {
  const { appData } = useContext(Context);
  const [currentImg, setCurrentImg] = useState(0);

  let images = [
    appData.artists[0]?.strArtistFanart,
    appData.artists[0]?.strArtistFanart2,
    appData.artists[0]?.strArtistFanart3,
    appData.artists[0]?.strArtistFanart4,
  ];

  return (
    <div className={styles['carousel-wrapper']}>
      <div className={styles.carousel}>
        <div
          className={styles['carousel-inner']}
          style={{
            backgroundImage: `url(${images[currentImg]})`,
            height: '30rem',
            width: '30rem',
          }}
        >
          <div
            className={styles.left}
            type='button'
            onClick={() => {
              currentImg > 0 && setCurrentImg(currentImg - 1);
            }}
          >
            {<ArrowLeftIcon style={{ fontSize: 62 }} />}
          </div>
          <div className={styles.center}></div>
          <div
            className={styles.right}
            onClick={() => {
              currentImg < images.length - 1 && setCurrentImg(currentImg + 1);
            }}
          >
            {<ArrowRightIcon style={{ fontSize: 62 }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
