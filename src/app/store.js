import { configureStore } from '@reduxjs/toolkit'
import auth from '../stores/Auth.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Create persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['value'], // Only persist the 'value' state inside auth
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use the persisted auth reducer
  },
});

export const persistor = persistStore(store); // This will enable persisting
export default store;