import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
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
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
    , document.getElementById('root'));
    registerServiceWorker();
