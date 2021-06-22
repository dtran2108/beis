import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withRouter } from 'next/router';
import { UIButton } from '~/views/presentation/ui/buttons';
import Color from 'color';
import { mediaMin, mediaMax } from '~/views/utils/layout';
import { PlusCircleOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import strings from '~/localization';

const TitleStyle = styled.h3`
  margin: 0;
  span.main-title {
    text-transform: capitalize;
    color: ${Color.primaryText};
    font-size: 20px;
    margin-right: 10px;
  }
  span.sub-title {
    color: ${Color.gray11};
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

const PageTitle = (props) => {
  const { enableImport = false, enableExport = false } = props;
  return (
    <TitleContainer>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <TitleWrapper>
        <TitleStyle>
          <span className="main-title">{props.title}</span>
          {props.subTitle && <span className="sub-title">{props.subTitle}</span>}
        </TitleStyle>

        {props.btnAdd && (
          <UIButton type="primary" ghost icon={<PlusCircleOutlined />} className="ml-3 btn-pd-add" onClick={props.btnAdd}>
            Thêm mới
          </UIButton>
        )}

        {props.btnImport && (
          <UIButton
            type="primary"
            icon={<UploadOutlined />}
            className="mr-2 ml-2 btn-pd-import"
            onClick={props.btnImport}
            disabled={!enableImport}>
            {strings.import}
          </UIButton>
        )}

        {props.btnExport && (
          <UIButton type="primary" icon={<DownloadOutlined />} className="btn-pd-export" onClick={props.btnExport} disabled={!enableExport}>
            {strings.export}
          </UIButton>
        )}
      </TitleWrapper>
    </TitleContainer>
  );
};

PageTitle.defaultProps = {
  showBackBtn: false
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  breadcrumb: PropTypes.array,
  showBackBtn: PropTypes.bool
};

export default withRouter(PageTitle);
