/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from './Accounts';
import ChangePassword from './ChangePassword';
import { ChangeEmail } from './ChangeEmail';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => err);
  }, []);
  return (

    <div>
      {loggedIn && (
        <div>
          <h1>settings</h1>
          <ChangePassword />
          <ChangeEmail />
        </div>
      )}

    </div>
  );
};
