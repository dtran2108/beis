import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// import translation from '~/locales';

// addLocaleData([...viLocaleData, ...enLocaleData]);

const LocaleWrapper = (props) => {
  // const messages = translation[locale].home;

  return (
    <IntlProvider locale="vi" key={'vi'}>
      {props.children}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  // locale: state['appData'].locale
});

export default connect(mapStateToProps)(LocaleWrapper);
