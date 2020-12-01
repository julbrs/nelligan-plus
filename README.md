# Nelligan+++

An application to manage multiple accounts of book library for the Montreal Nelligan system.

This is a frontend application using `ReactJS`. It consumes: 
- a dedicated backend to get info regarding books. (see **backend** section)
- Firebase for the auth system and card storing

## Develop

```
yarn install
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deploy

```
yarn build
firebase deploy
```

## Backend 

There is also the backend that is used to serve the library content. It is managed by the serverless 
framework, deployed on AWS (Lambda)

The endpoint is currently deployed on https://91odko1hg0.execute-api.us-east-1.amazonaws.com/prod/api/

```
cd backend/
sls deploy --stage=prod
```

### Test it ?

```
http https://91odko1hg0.execute-api.us-east-1.amazonaws.com/prod/api/history card==XX pin==XX
```