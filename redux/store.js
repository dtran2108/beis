import { useMemo, useCallback } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as rootReducer from './index';
import { apiService } from './middlewares/index';

let store;

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['appData', 'authUser', 'cart', 'address'] // whitelist reducers
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return compose(applyMiddleware(...middleware));
};

function makeStore(initialState) {
  const rootReducers = combineReducers(rootReducer);

  const persistedReducer = persistReducer(persistConfig, rootReducers);

  const middlewares = [apiService];

  return createStore(
    //
    persistedReducer,
    initialState,
    bindMiddleware(middlewares)
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  console.log(`ithoangtan -  ~ file: store.js ~ line 41 ~ initializeStore ~ _store`, _store);
  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
