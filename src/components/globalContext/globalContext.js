import React, { createContext, useState } from 'react';

export const Context = createContext({});

const GlobalProvider = (props) => {
  const [appData, setAppData] = useState(null);
  const [idArtist, setIdArtist] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );

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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
