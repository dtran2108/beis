import styled, { css } from 'styled-components';
import { Button } from 'antd';
import Color from '~/views/utils/layout/color';

export default styled(Button)`
  border-radius: ${(props) => (props.border ? props.border + 'px' : '4px')};
  width: ${(props) => (props.width ? props.width + 'px' : '125px')};
  height: ${(props) => (props.height ? props.height + 'px' : '35px')};

  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : 'inherit')};
  // text-transform: uppercase;
  ${(props) => {
    let cBorder = 'none',
      cBackgroundColor = '#5d9c1430',
      cColor = Color.white,
      cBackgroundHover = Color.green;
    // cBorder = `solid 1px ${Color.divider}`

    if (props.disabled) cBackgroundHover = '';
    if (!props.disabled) {
      switch (props.type) {
        case 'primary':
          if (props.ghost) {
            cBorder = `solid 1px ${Color.priceText}`;
            cBackgroundColor = `${Color.graytheme}`;
            cColor = Color.green;
          } else {
            cBackgroundColor = Color.gradientButton;
            cBackgroundHover = Color.hoverGradient;
          }
          break;
        case 'secondary':
          if (props.ghost) {
            cBorder = `solid 1px ${Color.gray}`;
            cBackgroundColor = `${Color.white}`;
            cColor = Color.gray;
            cBackgroundHover = Color.gray;
          } else {
            cBackgroundColor = Color.gray;
            cBackgroundHover = Color.white;
          }
          break;
        default:
          return null;
      }
    }

    return css`
      && {
        background: ${cBackgroundColor};
        color: ${cColor};
        border: ${cBorder};
        &:hover {
          background: ${cBackgroundHover};
          transition: background 0.3s ease-in;
          border: 1px solid ${cBackgroundColor};
          color: ${cBackgroundColor};
        }
      }
    `;
  }};

  &:disabled {
    background-color: ${Color.orange2};

    &:hover {
      border: 1px solid ${Color.orange2};
      color: ${Color.textWithBGPrimary};
      background-color: ${Color.orange2};
    }
  }
`;
