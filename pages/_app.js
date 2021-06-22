import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.less';
import '~/assets/antd-custom.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// aos
import 'aos/dist/aos.css';
// aos

import React from 'react';
import { useStore } from '~/redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalLoading } from '~/views/presentation/Modals/index';
import { Router } from 'next/router';
import { useEffect } from 'react';
import AOS from 'aos';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  useEffect(() => {
    AOS.init({
      duration: 700
    });
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    });
  }, []);

  return typeof window !== 'undefined' ? (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ModalLoading>
          <Component {...pageProps} />
        </ModalLoading>
      </PersistGate>
    </Provider>
  ) : (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
