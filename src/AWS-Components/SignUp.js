/* eslint-disable no-console */
import React, { useState } from 'react';
import UserPool from '../services/UserPool';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    // esta funcion toma 3 argumentos los cuales 3 son relevantes
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) console.log(err);
      console.log(data);
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
        <button type="submit">signUp</button>
      </form>
    </div>

  );
};

export default SignUp;
