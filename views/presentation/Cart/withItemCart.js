import { memo } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { cartActions } from '~/redux/cart';
import { authSelectors } from '~/redux/authUser';
import { withRouter } from 'next/router';

export default compose(
  memo,
  connect(
    (state) => ({
      authUser: authSelectors.getAuthUser(state)
    }),
    {
      changeQuantity: cartActions.changeQuantity,
      removeItemCart: cartActions.removeItemCart,
      removeItemCartServer: cartActions.removeItemCartServer,
      updateItemCartServer: cartActions.updateItemCartServer,
      updateNewPrice: cartActions.updateNewPrice
    }
  ),
  withRouter
);
