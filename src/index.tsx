import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {ApolloProvider} from '@apollo/client';

import {Provider} from 'react-redux'


import {store, persistor} from "./store"

import {client} from "./apollo";
import {PersistGate} from "redux-persist/integration/react";

import {
  BrowserRouter as Router
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Router>
            <App/>
          </Router>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
