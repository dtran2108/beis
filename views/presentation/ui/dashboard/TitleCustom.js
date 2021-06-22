import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  span {
    color: black !important;
    font-size: 16px;
    white-space: nowrap;
    width: max-content;
    margin-right: 16px;
  }
  margin-bottom: 15px;
  margin-top: 15px;
  .driven {
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    align-self: center;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    height: 1px;
    border: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #fafafa;   
     box-sizing: border-box;

`;
/**view
 *  @params title : label of data
 *          slot  : custom right slot of title
 */
const TitleCustom = (props) => {
  return (
    <Wrap>
      <span>{props.title}</span>

      <div className="driven"></div>
      {props.slot && props.slot}
    </Wrap>
  );
};

export default TitleCustom;
