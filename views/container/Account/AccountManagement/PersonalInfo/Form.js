import React, { useEffect, useState } from 'react';
import { first, values } from 'lodash';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { UtilDate } from '~/views/utils/helpers';
import { GENDER, DATE_FORMAT } from '~/configs/index';
import moment from 'moment';
import { authActions } from '~/redux/authUser';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';
import { UIAddressCascader, UIUploadImageCrop } from '~/views/presentation/ui/fields';

const DatePickerStyled = styled(DatePicker)`
  input {
    margin: 0 !important;
  }
`;

function PersonalForm(props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [valueAddress, setValueAddress] = useState([]);
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  useEffect(() => {
    // only for address
    let addresses = first(props?.user?.addresses);
    let vAddresses = [addresses?.provinceId, addresses?.districtId, addresses?.wardsId];
    setValueAddress(vAddresses || []);
    // only for address
    form.setFieldsValue({
      avatar: [props?.user?.avatar],
      name: props?.user?.name || '',
      email: props?.user?.email || '',
      identityCard: props?.user?.identityCard || '',
      phoneNumber: first(props?.user?.phones)?.phoneNumber || '',
      birthday: moment(UtilDate?.toDateLocal(props?.user?.birthday) || '29/07/1999', 'DD/MM/YYYY'),
      gender: props?.user?.gender || '',
      address1: first(props?.user?.addresses)?.address1,
      address: vAddresses || []
    });
  }, []);

  const onFinish = (values) => {
    setSubmitting(true);
    const body = {
      avatar: first(values.avatar),
      name: values.name,
      email: values.email,
      identityCard: values.identityCard,
      phones: [
        {
          phoneNumber: values.phoneNumber,
          type: 'MOBILE',
          isDefault: true,
          profileId: null
        }
      ],
      birthday: values.birthday,
      gender: values.gender,
      addresses: [
        {
          address1: values.address1,
          address2: null,
          provinceId: values.address[0],
          districtId: values.address[1],
          wardsId: values.address[2]
        }
      ]
    };
    props
      .updateUser(body)
      .then((res) => {
        setSubmitting(false);
        props.setIsEditing(false);
        message.success('Cập nhật thông tin thành công!');
      })
      .catch((err) => {
        setSubmitting(false);
        console.error('trandev ~ file: Form.js ~ line 60 ~ onFinish ~ err', err);
        message.error('Cập nhật thông tin thất bại!');
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: index.js ~ line 26 ~ onFinish ~ err', err);
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <UIUploadImageCrop
        onImageChange={(fileList) => {
          form.setFieldsValue({ avatar: fileList });
        }}
        fileList={props?.user?.avatar}
        shape="round"
        name="avatar"
        label="Avatar"
        maximumUpload={1}
        aspect={1}
        rules={[]}
      />
      <Form.Item name="name" label="Tên" hasFeedback rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.minValidate())}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input readOnly />
      </Form.Item>
      <Form.Item name="identityCard" label="Số CMND/CCCD">
        <Input readOnly />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        hasFeedback
        rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.phoneValidate())}>
        <Input />
      </Form.Item>
      <Form.Item name="birthday" label="Ngày sinh" hasFeedback rules={ANT_VALIDATE.commonValidate()}>
        <DatePickerStyled format={DATE_FORMAT} className="w-100" />
      </Form.Item>
      <Form.Item name="gender" label="Giới tính" hasFeedback rules={ANT_VALIDATE.commonValidate()}>
        <Select
          options={Object.keys(GENDER).map((g) => {
            return { label: GENDER[g], value: g };
          })}
        />
      </Form.Item>
      <UIAddressCascader
        needLoadDefault={true}
        valueAddress={valueAddress}
        label="Địa chỉ"
        noLabel
        selectPlaceholder="Chọn khu vực"
        inputPlaceholder="Nhập số nhà, tên đường"
        validateStatus={submitting ? 'validating' : undefined}
      />
      <Form.Item className="float-right">
        <Button type="dashed" className="ml-2 mb-0" onClick={() => props.setIsEditing(false)}>
          Huỷ
        </Button>
        <Button htmlType="submit" type="primary" className="m-0" loading={submitting}>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  { updateUser: authActions.updateUser }
)(PersonalForm);
