import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter } from 'next/router';
import { findKey, dropRight, last } from 'lodash';
import { getAuthUser } from '~/redux/authUser/selectors';
import { authActions } from '~/redux/authUser';
import { cartSelectors } from '~/redux/cart';
import { connect } from 'react-redux';

const setSelectedKeys = (menus, path, keys) => {
  const keyOption = findKey(menus, (menu) => {
    let url = menu.path;
    if ((path || '').startsWith(url)) {
      return true;
    }
    return false;
  });

  if (keyOption) {
    keys.push(keyOption);
    if (menus[keyOption] && menus[keyOption].subMenus) {
      setSelectedKeys(menus[keyOption].subMenus, path, keys);
    }
  }
};

const enhance = compose(
  connect(
    (state) => ({
      user: getAuthUser(state),
      cartItemCounter: cartSelectors.getTotalItemsCart(state)
    }),
    {
      logout: authActions.logout
    }
  ),
  withRouter,
  withState('defaultSelectedKeys', 'setDefaultSelectedKeys', ({ location, menus }) => {
    const keys = [];
    setSelectedKeys(menus, location.pathname, keys);
    return keys;
  }),
  withState('openKeys', 'setOpenKeys', ({ defaultSelectedKeys }) => {
    return dropRight(defaultSelectedKeys, 1);
  }),
  withState('menus', 'setMenus', (props) => props.menus),
  withHandlers({
    onOpenChange: ({ setOpenKeys }) => (openKeys) => {
      setOpenKeys([last(openKeys)]);
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (nextProps.isCollapsed && nextProps.isCollapsed !== this.props.isCollapsed) {
        nextProps.setOpenKeys([]);
        return false;
      }
      return true;
    }
  })
);

export default enhance;
