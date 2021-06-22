import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, connect } from 'react-redux';
import { getCategoryList } from '~/redux/home/index';
import Counter from './counter';
import Clock from './clock';

class Page extends React.PureComponent {
  state = {
    listCategory: []
  };

  componentDidMount() {
    const { getCategoryList } = this.props;
    getCategoryList()
      .then((res) => {})
      .catch((err) => {
      });
  }

  render() {
    const { title, linkTo, NavigateTo, getCategoryList, lastUpdate, placeholderData, error, light } = this.props;

    return (
      <div className="navbar">
        <div className="container">
          <h1>{title}</h1>
          <Clock lastUpdate={lastUpdate} light={light} />
          <Counter />
          <nav>
            <Link href={linkTo}>
              <a>Navigate: {NavigateTo}</a>
            </Link>
          </nav>
          {placeholderData &&
            placeholderData.data.map((item, key) => {
              return (
                <div key={key}>
                  <div key={key}>vendor: {item.name}</div>
                </div>
              );
            })}
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    placeholderData: state.placeholderData,
    lastUpdate: state.lastUpdate,
    light: state.light,
    error: state.error
  }),
  {
    getCategoryList
  }
)(Page);
