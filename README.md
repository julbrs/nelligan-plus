# Nelligan+++

An application to manage multiple accounts of book library for the Montreal Nelligan system.


## Serverless backend

Managed by the serverless framework, goal is to deploy that on AWS.

```
cd backend/
sls deploy --stage=prod
```

### Test it ?

```
http https://2l0b3jpmdi.execute-api.us-east-1.amazonaws.com/dev/api/history card==XX pin==XX
```

## React frontend

React app

```
cd client/
npm install
npm start
```

Deploy?

```
npm run deploy
```
