import React from 'react';
import { compose, withState, withHandlers, pure, lifecycle } from 'recompose';
import styled from 'styled-components';
import { Dropdown, Menu, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const WrapMenuAction = styled.div`
  -webkit-transition: all 0.4s 0s ease;
  -moz-transition: all 0.4s 0s ease;
  -o-transition: all 0.4s 0s ease;
  transition: all 0.4s 0s ease;
  border-radius: 32px;
  width: 32px;
  height: 32px;
  :hover {
    .icon i {
      transform: rotate(90deg) scale(1) skew(0deg) translate(0px);
      -webkit-transform: rotate(90deg) scale(1) skew(0deg) translate(0px);
      -moz-transform: rotate(90deg) scale(1) skew(0deg) translate(0px);
      -o-transform: rotate(90deg) scale(1) skew(0deg) translate(0px);
      -ms-transform: rotate(90deg) scale(1) skew(0deg) translate(0px);
    }
  }
  .icon {
    width: 32px;
    height: 32px;
    font-size: 20px;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .icon-not-scale {
    width: 32px;
    height: 32px;
    font-size: 20px;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
`;

const handleMenuClick = () => {
  message.info('Click on menu item.');
};

const handleButtonClick = () => {
  message.info('Click on button.');
};

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

const MenuAction = (props) => {
  const { icon, onClick } = props;
  return (
    <WrapMenuAction>
      {icon ? (
        <div className="icon-not-scale" role="presentation" onClick={onClick}>
          {icon}
        </div>
      ) : (
        <Dropdown onClick={handleButtonClick} overlay={menu} placement="bottomRight">
          <div className="icon">
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </div>
        </Dropdown>
      )}
    </WrapMenuAction>
  );
};

const initState = {
  data: [],
  value: undefined,
  fetching: false
};

export default compose(
  pure,
  withState('state', 'setState', (props) => (props.defaultValue ? props.defaultValue : initState)),
  withHandlers({
    handleChange: () => () => {}
  }),
  lifecycle({
    UNSAFE_componentWillReceiveProps() {},
    componentDidUpdate() {},
    componentDidMount() {}
  })
)(MenuAction);
