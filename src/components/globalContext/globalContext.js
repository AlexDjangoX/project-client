import React, { createContext, useState } from 'react';

export const Context = createContext({});

const GlobalProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <Context.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalProvider;
