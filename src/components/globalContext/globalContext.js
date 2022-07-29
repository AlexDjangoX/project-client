import React, { createContext, useState } from 'react';

export const Context = createContext({});

const GlobalProvider = (props) => {
  const [appData, setAppData] = useState(null);
  const [idArtist, setIdArtist] = useState('');
  console.log('GLOBAL_APP_DATA : ', appData);
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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
