import { DynamicFieldsStyle } from './styles';
import { InputNumber, SelectField } from '~/views/presentation/ui/fields';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import strings from '~/localization';
/**
 * ONLY FOR 1 SELECT and 1 INPUT
 * @param {*} props
 */

export default class DynamicFields extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valueNumber: undefined,
      valueSelect: undefined
    };
  }

  onChangeSelect = (name, value) => {
    this.setState({ valueSelect: value });

    // const {setFieldValue} = this.props;
    // setFieldValue(name, value);
    // this.props.info[name] = value;
  };

  onChangeNumber = (value) => {
    this.setState({ valueNumber: value });

    // const {setFieldValue} = this.props;
    // setFieldValue(name, e);
    // this.props.info[name] = e;
  };
  render() {
    const {
      label,
      help,
      size,
      className,
      disabled,
      onBlur,
      validateStatus,
      dataOptions,
      gutterbottom,
      placeholder1,
      placeholder2,
      labelCol,
      wrapperCol,
      required = false
    } = this.props;

    return (
      <DynamicFieldsStyle
        label={label}
        size={size}
        required={required}
        className={className}
        hasFeedback
        validateStatus={validateStatus}
        // help={help}
        gutterbottom={gutterbottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}>
        <div className="d-flex flex-row w-100">
          <SelectField
            name="typeId"
            validateStatus={validateStatus}
            help={help}
            data={dataOptions}
            disabled={disabled}
            // value={this.state.valueSelect}
            onChange={this.onChangeSelect}
            onBlur={onBlur}
            placeholder={placeholder1}
            className="w-50 mr-3"
          />
          <InputNumber
            name="value"
            validateStatus={validateStatus}
            help={help}
            min={0}
            max={100}
            disabled={disabled}
            suffix={` ${strings.percent}`}
            value={this.state.valueNumber}
            onChange={this.onChangeNumber}
            onBlur={onBlur}
            placeholder={placeholder2}
            className="w-50"
          />
        </div>
      </DynamicFieldsStyle>
    );
  }
}

DynamicFields.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  // gutterbottom: true,
  mode: 'default',
  showSearch: false,
  loading: false
};

DynamicFields.propTypes = {
  showSearch: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array,
  gutterbottom: PropTypes.bool
};
