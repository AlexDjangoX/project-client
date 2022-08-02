import React, { createContext, useState, useEffect } from 'react';
import client from '../../utils/client';
export const Context = createContext({});

const GlobalProvider = (props) => {
  const [appData, setAppData] = useState(null);
  const [idArtist, setIdArtist] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [componentState, setComponentState] = useState([]);
  const [uniqueByArtistStr, setUniqueByArtistStr] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );

  const fetchDataFromDB = async (id) => {
    try {
      const response = await client.get(`/albums/${id}`);
      const data = await response.data.data.albums.map((item) => item.album);
      setFavorites(data);
      setComponentState(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataFromDB(loggedInUser.id);
    console.log(loggedInUser.id);
  }, [loggedInUser.id]);

  console.log(favorites);

  const uniqueArtist = (array) => {
    array.forEach((item) => {
      if (!uniqueByArtistStr.includes(item.strArtist)) {
        uniqueByArtistStr.push(item.strArtist);
      }
    });
  };

  uniqueArtist(favorites);

  return (
    <Context.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        appData,
        setAppData,
        idArtist,
        setIdArtist,
        favorites,
        setFavorites,
        videoData,
        setVideoData,
        fetchDataFromDB,
        componentState,
        setComponentState,
        uniqueByArtistStr,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
