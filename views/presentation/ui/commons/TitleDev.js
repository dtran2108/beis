import { ArrowLeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import strings from '~/localization';
import { UIButton } from '~/views/presentation/ui/buttons';
import { mediaMax, mediaMin } from '~/views/utils/layout';
import Color from 'color';

const TitleStyle = styled.h3`
  padding: 0px 0px 8px 0px;
  margin: 0;
  span.main-title {
    text-transform: capitalize;
    color: ${Color.textThird};
    font-size: 14px;
    margin-right: 10px;
    font-style: italic;
  }
  span.sub-title {
    color: ${Color.secondaryText};
    font-size: 14px;
    display: inline-block;
    font-weight: normal;
  }
`;

const TitleWrapper = styled.div`
  .ant-btn {
    min-width: 50px;
    height: 30px;
    line-height: 1;
  }
  ${mediaMin.sm`
		display: flex;
		align-items: center;
	`}
  ${mediaMax.sm`
		.btn{
			margin-bottom: 15px;
		}
	`}
`;

const TitleContainer = styled.div``;

const TitleDev = (props) => (
  <TitleContainer>
    {/* <Button shape="circle" icon={<BackwardOutlined />} onClick={() => props.history.goBack}></Button> */}
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
    <TitleWrapper>
      <TitleStyle>
        <span className="main-title">{props.title}</span>
        {props.subTitle && <span className="sub-title">{props.subTitle}</span>}
      </TitleStyle>

      {props.btnDev && (
        <UIButton type="primary" ghost icon={<ArrowLeftOutlined />} onClick={props.btnDev}>
          {strings.back}
        </UIButton>
      )}
    </TitleWrapper>
  </TitleContainer>
);

TitleDev.defaultProps = {
  showBackBtn: false
};

TitleDev.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  breadcrumb: PropTypes.array,
  showBackBtn: PropTypes.bool
};

export default withRouter(TitleDev);
