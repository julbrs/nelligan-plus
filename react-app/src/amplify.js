const amplify = {
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    oauth: {
      domain: `${process.env.REACT_APP_USER_UI_DOMAIN}.auth.${process.env.REACT_APP_REGION}.amazoncognito.com`,
      scope: ["phone", "email", "profile", "openid"],
      redirectSignIn: process.env.REACT_APP_DOMAIN,
      redirectSignOut: process.env.REACT_APP_DOMAIN,
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
  //   Storage: {
  //     region: config.s3.REGION,
  //     bucket: config.s3.BUCKET,
  //     identityPoolId: config.cognito.IDENTITY_POOL_ID
  //   },
  API: {
    endpoints: [
      {
        name: "main",
        endpoint: process.env.REACT_APP_API_URL,
        region: process.env.REACT_APP_REGION,
      },
    ],
  },
};
export default amplify;
