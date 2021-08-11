/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState } from 'react';
import { AccountContext } from './Accounts';

export default () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession, authenticate } = useContext(AccountContext);

  const obSubmit = (event) => {
    event.preventDefault();

    getSession()
      .then(({ user, email }) => {
        authenticate(email, password)
          .then(() => {
            user.changePassword(password, newPassword, (err, result) => {
              console.log(result);
            });
          });
      }).catch((e) => e);
  };
  return (
    <div>
      <form onSubmit={obSubmit}>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Old Password"
        />

        <input
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="New Password"
        />

        <button type="submit">Change password</button>

      </form>
    </div>
  );
};
