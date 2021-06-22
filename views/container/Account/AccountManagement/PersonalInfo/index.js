import React, { useState } from 'react';
import { first } from 'lodash';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PersonalForm from './Form';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import { connect } from 'react-redux';
import { UtilDate } from '~/views/utils/helpers';
import { GENDER } from '~/configs/index';
import styled from 'styled-components';
import { firstImage } from '~/views/utils/helpers/utilObject';

const AvatarStyled = styled(Avatar)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PersonalInfo(props) {
  const [isEditting, setIsEditing] = useState(false);
  return (
    <AccountCardStyled
      className="mb-4"
      title="Thông tin cá nhân"
      extra={
        <Button className="m-0 p-0" type="link" onClick={() => setIsEditing(true)}>
          Chỉnh sửa
        </Button>
      }
      bordered={false}>
      {!isEditting && (
        <>
          <div className="row mobile-reverse">
            <div className="col-12 col-lg-8">
              <p>
                Tên: {props?.user?.title || ''} {props?.user?.name || ''}
              </p>
              <p>Email: {props?.user?.email || ''}</p>
              <p>ID: {props?.user?.identityCard || ''}</p>
              <p>Số điện thoại: {first(props.user?.phones)?.phoneNumber || ''}</p>
              <p>Ngày sinh: {UtilDate?.toDateLocal(props?.user?.birthday) || ''}</p>
              <p>Giới tính: {GENDER[props?.user?.gender] || ''}</p>
            </div>
            <div className="col-12 col-lg-4 mb-3 mb-lg-0 d-flex justify-content-center align-items-center d-lg-block">
              <AvatarStyled
                icon={!props?.user?.avatar ? <UserOutlined /> : null}
                size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 80, xxl: 100 }}
                src={firstImage(props?.user?.avatar) || null}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>Địa chỉ: {first(props?.user?.addresses)?.fullAddress || ''}</p>
              <center>Nhận thông tin về sản phẩm mới qua Email</center>
            </div>
          </div>
        </>
      )}
      {isEditting && <PersonalForm setIsEditing={setIsEditing} />}
    </AccountCardStyled>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  {}
)(PersonalInfo);
