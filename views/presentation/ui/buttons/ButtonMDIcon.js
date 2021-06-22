import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function ButtonMDIcon(props) {
  return (
    <button
      type="button"
      className={classnames(
        'btn',
        props.icon && !props.text ? 'btn-icon' : '',
        `btn-${props.type}`,
        props.icon && props.text ? 'btn-icon-text' : '',
        props.outline ? `btn-outline-${props.type}` : ''
      )}
      style={props.style}
      onClick={props.onClick ? props.onClick : null}
      disabled={props.disabled}>
      {props.icon && <i className={classnames('mdi', props.icon, props.icon && props.text ? 'btn-icon-prepend' : '')} />}
      {props.text}
    </button>
  );
}

ButtonMDIcon.defaultProps = {
  type: 'primary'
};

ButtonMDIcon.propType = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default ButtonMDIcon;
