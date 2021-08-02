import React from 'react';

import { useStore } from '~/redux/store';

export default function SSR() {
  return <p>Need init store</p>;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
  const initialReduxState = {
    // your init value
  };

  const store = useStore(initialReduxState);

  const { dispatch } = store;

  dispatch({
    type: 'TICK',
    light: false,
    lastUpdate: Date.now()
  });

  return { props: { initialReduxState: store.getState() } };
}
