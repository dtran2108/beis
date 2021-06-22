import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { UITButtonMDIcon } from '.';

function DropdownMDIcon(props) {
  const { onClick, items, type, text, icon, ...rest } = props;
  const menu = (
    <Menu onClick={(e) => onClick(e.key)}>{items && items.map((item) => <Menu.Item key={item.value}>{item.label}</Menu.Item>)}</Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} {...rest}>
      <div>
        <UITButtonMDIcon type={type} text={text} icon={icon} />
      </div>
    </Dropdown>
  );
}

DropdownMDIcon.defaultProps = {
  type: 'primary',
  onClick: () => {}
};

DropdownMDIcon.propType = {
  type: PropTypes.string,
  text: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func
};

export default DropdownMDIcon;
