import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import * as rootReducer from '../index';
import { persistStore, persistReducer } from 'redux-persist';
// import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import { apiService } from '../middlewares/index';
import { createLogger } from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authUser', 'appData', 'cart', 'address'] // whitelist reducers
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return compose(applyMiddleware(...middleware));
};

export const makeStore = (context) => {
  const rootReducers = combineReducers(rootReducer);

  const isClient = typeof window !== 'undefined';

  const pReducer = persistReducer(persistConfig, rootReducers);w
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [apiService, sagaMiddleware];

  const isServer = typeof window === 'undefined';
  if (process.env.NODE_ENV === 'development' && !isServer) {
    middlewares.push(createLogger());
  }

  let store = createStore(pReducer, undefined, bindMiddleware(middlewares));
  store.__persistor = persistStore(store);
  return store;
};

export const store = makeStore();

export const wrapper = createWrapper(makeStore, { debug: true });
