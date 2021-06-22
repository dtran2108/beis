import styled from 'styled-components';
import { Tabs } from 'antd';
import { Color } from '~/views/utils/layout';

export const TabsWrapperStyled = styled(Tabs)`
  .ant-tabs-nav,
  .ant-tabs-nav > div {
    display: flex;
    width: ${(props) => props.fullWidth && '100%'};
  }
  .ant-tabs-nav-active {
    color: ${Color.yellow};
  }
  .ant-tabs-tab {
    margin: 0;
    flex: 1;
    font-weight: bold;
    span {
      display: block;
      text-align: center;
      width: 100%;
    }
    &:hover {
      color: ${Color.yellow};
    }
  }
  .ant-tabs-tab-active {
    color: ${Color.yellow};
  }
  .ant-tabs-ink-bar {
    background-color: ${Color.yellow};
  }
`;
