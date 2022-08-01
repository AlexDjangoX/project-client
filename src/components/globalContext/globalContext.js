import React, { createContext, useState, useEffect } from 'react';
import client from '../../utils/client';
export const Context = createContext({});

const GlobalProvider = (props) => {
  const [appData, setAppData] = useState(null);
  const [idArtist, setIdArtist] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );

  useEffect(() => {
    fetchDataFromDB(loggedInUser.id);
  }, []);

  const fetchDataFromDB = async (id) => {
    try {
      const response = await client.get(`/albums/${id}`);
      const data = await response.data.data.albums.map((item) => item.album);
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
