/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../services/UserPool';

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () => new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession(async (err, session) => {
        if (err) {
          reject();
        } else {
          const attributes = await new Promise((resolve, reject) => {
            user.getUserAttributes((err, attributes) => {
              if (err) {
                return reject(err);
              }
              const results = {};
              try {
                // eslint-disable-next-line no-restricted-syntax
                for (const attribute of attributes) {
                  const { Name, Value } = attribute;
                  results[Name] = Value;
                }
              } catch (err) {
                return err;
              }

              return resolve(results);
            });
          });

          resolve({
            user,
            ...session,
            ...attributes,
          });
        }
      });
    } else {
      reject();
    }
  });

  const authenticate = async (Username, Password) => {
    const user = new CognitoUser({ Username, Pool });
    const authDetails = new AuthenticationDetails({ Username, Password });

    // this requieres 2 arguments for verification, details and an object
    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{
      authenticate,
      getSession,
      logout,
    }}
    >
      {props.children}
    </AccountContext.Provider>

  );
};

export { Account, AccountContext };
