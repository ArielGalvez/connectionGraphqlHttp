import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';

import ApolloClient from 'apollo-boost';
import apolloClient from './apolloSetup';


ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
