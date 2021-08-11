/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from './Accounts';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const { getSession, authenticate } = useContext(AccountContext);

  const obSubmit = (event) => {
    event.preventDefault();

    getSession()
      .then(({ user, email }) => {
        authenticate(email, password)
          .then(() => {
            const attributes = [
              new CognitoUserAttribute({ Name: 'email', Value: newEmail }),
            ];
            user.updateAttributes(attributes, (err, results) => {
              if (err) console.error(err);
              console.log(results);
            });
          });
      }).catch((e) => e);
  };
  return (
    <div>
      <form onSubmit={obSubmit}>

        <input
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          placeholder="New email"
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Old email"
        />

        <button type="submit">Change email</button>

      </form>
    </div>
  );
};

export { ChangeEmail, CognitoUserAttribute };
