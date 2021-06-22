import React, { Fragment } from 'react';
import { map } from 'lodash';
import { Menu } from 'antd';
import Link from 'next/link';
import enhance from '~/views/presentation/ui/navigation/withMenuEnhancer';
import { Badge } from 'antd';

function renderMenuItem(props) {
  const { keyOption, icon, name, path, subMenus, title, cartItemCounter, isCounter } = props;

  if (subMenus) {
    return (
      <Menu.SubMenu
        key={keyOption}
        title={
          <span>
            {(isCounter && (
              <Badge count={cartItemCounter} showZero>
                {icon} <span>{name}</span>
              </Badge>
            )) || (
              <span>
                {icon} <span>{name}</span>
              </span>
            )}
          </span>
        }>
        {map(subMenus, (item, keyOption) => renderMenuItem({ ...item, keyOption }))}
      </Menu.SubMenu>
    );
  }
  if (title) {
    return (
      <Menu.ItemGroup key={title} title={title}>
        <Menu.Item key={keyOption}>
          {(isCounter && (
            <Link to={path}>
              {icon} <span>{name}</span>
              <Badge count={cartItemCounter} showZero />
            </Link>
          )) || (
            <Link to={path}>
              {icon} <span>{name}</span>
            </Link>
          )}
        </Menu.Item>
      </Menu.ItemGroup>
    );
  }
  return (
    <Menu.Item key={keyOption}>
      {(isCounter && (
        <Link to={path}>
          {icon} <span>{name}</span>
          <Badge count={cartItemCounter} showZero />
        </Link>
      )) || (
        <Link to={path}>
          {icon} <span>{name}</span>
        </Link>
      )}
    </Menu.Item>
  );
}

function Sidebar({ menus, openKeys, defaultSelectedKeys, isCollapsed, onOpenChange, handleClick, theme, cartItemCounter }) {
  return (
    <Fragment>
      <Menu
        mode="inline"
        theme={theme}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={defaultSelectedKeys}
        inlineCollapsed={isCollapsed}
        onClick={handleClick}>
        {map(menus, (item, keyOption) => renderMenuItem({ ...item, keyOption, cartItemCounter }))}
      </Menu>
    </Fragment>
  );
}

export default enhance(Sidebar);
