import React, { PureComponent } from 'react';
import { compose, withState } from 'recompose';
import { Tabs } from 'antd';
import _ from 'lodash';
import { TabsWrapperStyled } from './styles';
import { getArray } from '~/utils/helpers/utilObject';

const TabPane = Tabs.TabPane;

class TabsWrapper extends PureComponent {
  render() {
    const { animated, position, size, tabStyle, tabs, activeKey, setActiveKey, className } = this.props;

    return tabs ? (
      <TabsWrapperStyled
        activeKey={activeKey}
        className={className}
        animated={animated}
        tabPosition={position}
        size={size}
        onChange={(e) => setActiveKey(e)}
        tabBarStyle={tabStyle}
        defaultActiveKey={activeKey}>
        {tabs.map((tab) => (
          <TabPane
            key={JSON.stringify(tab.id)}
            tab={
              <span>
                {tab.icon}
                {tab.title}
              </span>
            }>
            {(this.props.html && <div dangerouslySetInnerHTML={{ __html: tab.content }} />) || tab.content}
          </TabPane>
        ))}
      </TabsWrapperStyled>
    ) : null;
  }
}

TabsWrapper.defaultProps = {
  animated: false,
  position: 'top',
  size: 'default',
  icon: null
};

export default compose(
  withState('activeKey', 'setActiveKey', ({ tabs }) => {
    return tabs && tabs.length ? JSON.stringify(_.first(getArray(tabs, 'id'))) : '1';
  })
)(TabsWrapper);
