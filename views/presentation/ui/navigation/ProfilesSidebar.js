import React from 'react';
import { Menu } from 'antd';
import strings from '~/localization';
import { ALL_PROFILES_PATH } from '~/configs/routesConfig';
import { PROFILE_TYPES } from '~/configs/const';
import { compose } from 'recompose';
import { withRouter } from 'next/router';

const menus = [
  { links: ALL_PROFILES_PATH, name: strings.all_profiles },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.PERSONAL_PROFILE, name: strings.persional_profile },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.FARM_PROFILE, name: strings.farm },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.ENTERPRISE, name: strings.business },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.COOPERATIVE, name: strings.cooperative },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.COOPERATIVE_VENTURE, name: strings.union_of_cooperative },
  { links: ALL_PROFILES_PATH + '/' + PROFILE_TYPES.ORGANIZATION, name: strings.organization }
  // { links: ALL_PROFILES_PATH + "/", name: strings.association_of_occupation},
  // { links: ALL_PROFILES_PATH + "/", name: strings.officials},
  // { links: ALL_PROFILES_PATH + "/", name: strings.foreign},
];

const ProfilesSidebar = (props) => {
  const { history } = props;
  return (
    <Menu style={{ height: '100%' }} defaultSelectedKeys={[props.match.url]} mode={'inline'} theme={'light'}>
      {menus.map((item) => (
        <Menu.Item key={item.links} onClick={() => history.push(item.links)}>
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};
export default compose(withRouter)(ProfilesSidebar);
