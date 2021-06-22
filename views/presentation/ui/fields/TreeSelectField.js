import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import { SelectStyle } from './styles';
import _ from 'lodash';
const { TreeNode } = TreeSelect;

export default class TreeSelectField extends PureComponent {
  render() {
    const { label, help, data, size, handleSelect, className, validateStatus, placeholder, labelCol, wrapperCol, mode, style } = this.props;

    const renderItems = (list) => {
      let results = null;
      if (_.isArray(list)) {
        results = list.map((item, index) => (
          <TreeNode value={item.value} key={index} title={item.label}>
            {renderItems(item.items)}
          </TreeNode>
        ));
      }
      return results;
    };

    return (
      <SelectStyle
        label={label}
        size={size}
        className={className}
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        // gutterbottom={gutterbottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        mode={mode}>
        <TreeSelect
          style={style}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          allowClear
          onChange={handleSelect}
          placeholder={placeholder}>
          {renderItems(data)}
        </TreeSelect>
      </SelectStyle>
    );
  }
}

TreeSelectField.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  gutterbottom: 'true',
  mode: 'default'
};

TreeSelectField.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array
  // gutterbottom: PropTypes.bool
};
