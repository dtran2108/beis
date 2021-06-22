import React from 'react';
import { Tooltip as TooltipWrapper } from 'antd';

const Tooltip = (props) => (
  <TooltipWrapper title={props.title} {...props.rest}>
    <div style={{ display: 'inline-block' }}>{props.children}</div>
  </TooltipWrapper>
);

export default Tooltip;
