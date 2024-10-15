import * as ReactDOM from "react-dom/client";
import * as React from "react";
import './assets/css/styles.css';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  </React.StrictMode>
);
