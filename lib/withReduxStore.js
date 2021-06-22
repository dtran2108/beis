import React from 'react';
import { makeStore } from '~/redux/store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return makeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = makeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const withReduxStore = (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const { Component, ctx } = appContext;
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      let pageProps = {};
      // const { store, req } = ctx;
      // const { locale, messages } = req || window.__NEXT_DATA__.props;
      // const locale = state['appData'].locale;
      // const { user } = state.authUser;

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      // const isAuthenticated = !!getCookie("jwtConsumer", req);

      // if (isAuthenticated) {
      //     if (!user) {
      //         //await reduxStore.dispatch(authActions.getUser(ctx));
      //     }
      // }

      return {
        ...appProps,
        pageProps
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
