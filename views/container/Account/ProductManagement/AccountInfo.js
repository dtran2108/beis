import React, { useState } from 'react';
import { first } from 'lodash';
import { Button } from 'antd';
import AccountForm from './Form';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import { connect } from 'react-redux';
import { UtilDate } from '~/views/utils/helpers';
import { GENDER } from '~/configs/index';

function AccountInfo(props) {
  const [isEditting, setIsEditing] = useState(false);

  const fields = [
    {
      label: 'ID',
      value: props?.user?.identityCard || ''
    },
    {
      label: 'Tên',
      value: `${props?.user?.title || ''} ${props?.user?.name || ''}`
    },
    {
      label: 'Email',
      value: props?.user?.email || ''
    },
    {
      label: 'Số điện thoại',
      value: first(props?.user?.phones)?.phoneNumber || ''
    },
    {
      label: 'Ngày sinh',
      value: UtilDate?.toDateLocal(props?.user?.birthday) || ''
    },
    {
      label: 'Giới tính',
      value: GENDER[props?.user?.gender] || ''
    },
    {
      label: 'Địa chỉ',
      value: first(props?.user?.addresses)?.fullAddress || ''
    }
  ];

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
        <div>
          {fields.map((f, i) => (
            <p key={i}>
              {f.label}: {f.value}
            </p>
          ))}
          <center>Nhận thông tin về sản phẩm mới qua Email</center>
        </div>
      )}
      {isEditting && <AccountForm setIsEditing={setIsEditing} />}
    </AccountCardStyled>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  {}
)(AccountInfo);
