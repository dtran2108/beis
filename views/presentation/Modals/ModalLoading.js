import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

export class ModalLoading extends Component {
  static _sharedModalLoading = undefined;
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    ModalLoading._sharedModalLoading = this;
  }

  static show() {
    if (ModalLoading._sharedModalLoading) {
      ModalLoading._sharedModalLoading.setState({ isLoading: true });
    }
  }

  static hide() {
    if (ModalLoading._sharedModalLoading) {
      ModalLoading._sharedModalLoading.setState({ isLoading: false });
    }
  }
  //this.state.isLoading && ModalLoading._sharedModalLoading

  render() {
    const { children } = this.props;

    return (
      <LoadingOverlay active={this.state.isLoading && ModalLoading._sharedModalLoading} spinner>
        {children}
      </LoadingOverlay>
    );
  }
}

export default ModalLoading;
