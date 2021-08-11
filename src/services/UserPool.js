import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_v5n8fAYjp',
  ClientId: '1tfp5b8ag5erf612lt8qld9uvn',
};

export default new CognitoUserPool(poolData);
