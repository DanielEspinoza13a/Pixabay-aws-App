/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

export default () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session:', session);
        setStatus(true);
      })
      .catch((e) => e);
  }, []);

  return (
    <div>
      {status ? (
        <div>
          you are logged in.
          <button type="button" onClick={logout}>Logout</button>
        </div>

      ) : 'Please login bellow'}
    </div>
  );
};
