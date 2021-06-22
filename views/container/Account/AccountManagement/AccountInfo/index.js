import React, { useState } from 'react';
import AccountForm from './Form';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import { connect } from 'react-redux';
import { Form, Alert } from 'antd';
import styled from 'styled-components';
import { getErrorDescription } from '~/utils/helpers/parseError';

const FormItemStyled = styled(Form.Item)`
  .ant-form-item-label label {
    margin: 0;
  }
  @media screen and (min-width: 769px) {
    .ant-form-item-label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

function AccountInfo(props) {
  const [isEditting, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);
  const layout = {
    labelCol: { lg: { span: 12 }, md: { span: 24 } },
    wrapperCol: { lg: { span: 12 }, md: { span: 24 } }
  };

  return (
    <AccountCardStyled className="mb-4" title="Thông tin tài khoản" bordered={false}>
      {!isEditting && (
        <>
          <Form {...layout}>
            <FormItemStyled label="Email">
              <span>{props?.user?.email || ''}</span>
            </FormItemStyled>
          </Form>
          <div className="d-flex justify-content-center align-items-center">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="button primary"
              style={{ borderRadius: '99px', textTransform: 'none' }}>
              Đổi mật khẩu
            </button>
          </div>
        </>
      )}
      {isEditting && (
        <>
          {formError && (
            <Alert
              className="mb-4"
              style={{ transition: 'all 0.3s ease-in-out' }}
              message="Lỗi"
              description={getErrorDescription(formError, 'password')}
              type="error"
              showIcon
            />
          )}
          <AccountForm setIsEditing={setIsEditing} setFormError={setFormError} />
        </>
      )}
    </AccountCardStyled>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  {}
)(AccountInfo);
