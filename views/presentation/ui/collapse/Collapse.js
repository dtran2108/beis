import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import { getArray, getString } from '~/utils/helpers/utilObject';
import { ItemCart } from '~/views/presentation/Cart';

const { Panel } = Collapse;
class UICollapsePanel extends PureComponent {
  render() {
    const { onChange, defaultActive, data } = this.props;
    return (
      <Collapse defaultActiveKey={defaultActive} onChange={onChange}>
        <Panel header={getString(data, 'manufacturerName') || ''} key="1">
          {(getArray(data, 'orderDetails') || []).map((product, i) => (
            <ItemCart data={product} key={i} />
          ))}
        </Panel>
      </Collapse>
    );
  }
}

UICollapsePanel.propType = {
  defaultActive: PropTypes.array,
  key: PropTypes.number,
  onChange: PropTypes.func
};

UICollapsePanel.defaultProps = {
  key: 1
};
export default UICollapsePanel;
