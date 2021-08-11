/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Pool from '../services/UserPool';

export default () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUser = () => new CognitoUser({
    Username: email.toLowerCase(),
    Pool,
  });

  const sendCode = (event) => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log('onSuccess:', data);
      },
      onFailure: (err) => {
        console.error('onfailure:', err);
      },
      inputVerificationCode: (data) => {
        console.log('Input code:', data);
        setStage(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('passwords are not the same');
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log('onSuccess:', data);
      },
      onFailure: (err) => {
        console.error('onfailure:', err);
      },
    });
  };

  return (
    <div>
      {
            stage === 1 && (
            <form onSubmit={sendCode}>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
              <button type="submit">Send verification code</button>
            </form>
            )
        }

      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Code"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"

          />
          <input
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"

          />
          <button type="submit">Change password</button>
        </form>
      )}
    </div>

  );
};
