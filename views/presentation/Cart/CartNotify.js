import React, { PureComponent } from 'react';
import { getWarningCart } from 'mapData';
import { getArray } from '~/utils/helpers/utilObject';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { cartSelectors } from '~/redux/cart';

class CartNotify extends PureComponent {
  render() {
    const { cartItems, getRequestBuyNow, payingOrder } = this.props;
    const { warnings } = getWarningCart(cartItems || []);
    if (getRequestBuyNow) {
      return null;
    } else if (payingOrder) {
      return null;
    } else {
      return (
        warnings.length > 0 && (
          <div className="col-xs-12 alert-wrap w-100 pl-5">
            <h3 className="notice">Thông báo quan trọng</h3>
            <ul className="list-notice">
              {warnings.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )
      );
    }
  }
}

export default compose(
  connect(
    (state) => ({
      getRequestBuyNow: cartSelectors.getRequestBuyNow(state),
      cartItems: (getArray(cartSelectors.getCart(state), 'cartItems') || []).reduce((prv, curr) => {
        return _.concat(prv, getArray(curr, 'products'));
      }, []),
      payingOrder: cartSelectors.getPayingOrder(state)
    }),
    null
  )
)(CartNotify);
