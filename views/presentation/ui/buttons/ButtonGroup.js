import styled, { css } from 'styled-components';

const ButtonGroup = styled.div`
  text-align: ${(props) => (props.align ? props.align : 'left')};
  button {
    display: inline-block;
    margin-bottom: ${(props) => (props.gutterbottom ? props.gutterbottom : '15px')};
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${(props) =>
    props.horizontal &&
    css`
      button {
        margin-bottom: 0;
        margin-right: ${(props) => (props.gutterRight ? props.gutterRight : '15px')};
        &:last-child {
          margin-right: 0;
        }
      }
    `}
`;

export default ButtonGroup;
