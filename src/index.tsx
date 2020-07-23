import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {Provider} from 'react-redux'
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from './reducers'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const store = configureStore({
  reducer: rootReducer,
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
