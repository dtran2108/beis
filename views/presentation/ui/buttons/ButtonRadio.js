import { Radio } from 'antd';
import styled from 'styled-components';
import { FILTER_TYPE, renderButtonFilter } from '~/configs/status';
import { getString } from '~/utils/helpers/utilObject';
import Color from '~/views/utils/layout/color';
import _ from 'lodash';

const WrapperButton = styled.div`
  .ant-radio-group {
    .ant-radio-button-wrapper {
      border: 1px dashed ${Color.primaryText};
      margin-left: 10px;
      border-radius: 4px;
    }
    .ant-radio-button-wrapper:not(:first-child)::before {
      content: unset;
    }
    .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
      background: ${Color.gradientButton};
      border: none;
    }
  }
`;

const ButtonRadio = (props) => {
  const { handleChange, defaultValue } = props;
  let renderButton = renderButtonFilter(t);

  if (!props.isAuthenticated) {
    renderButton = _.filter(renderButton, (o) => {
      return getString(o, 'value') !== FILTER_TYPE.BOUGHT;
    });
  }
  return (
    <WrapperButton>
      <Radio.Group defaultValue={defaultValue} buttonStyle="solid" optionType="button" className="mt-4" onChange={handleChange}>
        {renderButton.map((item, key) => (
          <Radio.Button value={item.value} key={key}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </WrapperButton>
  );
};

export default ButtonRadio;
