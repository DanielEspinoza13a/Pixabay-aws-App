/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { AccountContext } from './Accounts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log('logged in', data);
      })
      .catch((err) => {
        console.log('failed to login', err);
      });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"

        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"

        />
        <button type="submit">Login</button>
      </form>
    </div>

  );
};

export default Login;
