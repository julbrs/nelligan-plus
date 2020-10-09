import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers'
import thunk from 'redux-thunk';
import {loadState, saveState} from './localStorage'

const store = createStore(
  allReducers,
  loadState(),
  applyMiddleware(thunk)
);

  store.subscribe(() => {
    saveState({
      cards: store.getState().cards
    });
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
    registerServiceWorker();
