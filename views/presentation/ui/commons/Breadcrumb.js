import { Breadcrumb } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { authActions } from '~/redux/authUser';
import { getString } from '~/utils/helpers/utilObject';
import { countWords, getStringWithWord } from '~/views/utils/helpers/string';
import COLOR from '~/views/utils/layout/color';

const limitWord = 10;
const WrapperBreadcrum = styled(Breadcrumb)`
  .ant-breadcrumb-link {
    a {
      color: ${COLOR.breadcrumText};
      text-transform: capitalize;
    }
  }
`;

const UIBreadcrumb = ({ path, setBreadcrumb }) => {
  return (
    <WrapperBreadcrum separator=">" className="mt-2">
      <Breadcrumb.Item index={-1}>
        <Link href="/">Trang chủ</Link>
      </Breadcrumb.Item>
      {path !== undefined &&
        path?.length > 0 &&
        path?.map((item, index) => {
          const noLink = item.noLink ? true : false;

          if (index <= path.length - 1) {
            const title =
              countWords(getString(item, 'title', '')) <= limitWord ? item.title : `${getStringWithWord(item.title, limitWord)}...`;

            return index < path.length - 1 ? (
              <Breadcrumb.Item
                key={index}
                style={{ cursor: item.link ? 'pointer' : 'default' }}
                onClick={() => setBreadcrumb(item?.myBreadcrumb)}>
                {noLink ? title : <Link href={`${item.link}`}>{title}</Link>}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index} style={{ cursor: item.link ? 'pointer' : 'default', textTransform: 'capitalize' }}>
                {title}
              </Breadcrumb.Item>
            );
          } else return '';
        })}
    </WrapperBreadcrum>
  );
};

UIBreadcrumb.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};

export default compose(
  connect(null, {
    setBreadcrumb: authActions.setBreadcrumb
  })
)(UIBreadcrumb);
