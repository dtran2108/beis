import React from 'react';
import { Modal, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ModalStyled = styled(Modal)`
  .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-close {
    position: absolute;
    top: 6px;
  }
  .ant-modal-content {
    border-radius: 14px;
  }
  .ant-modal-header {
    border-radius: 14px 14px 0 0;
    border-bottom: none;
    padding: 23px 32px;
  }
  .ant-modal-title {
    font-size: 16px;
    font-family: Montserrat;
    font-weight: 600;
  }
  .ant-modal-body {
    font-family: Montserrat;
    padding: 23px 32px;
    max-height: 600px;
    overflow: scroll;
  }
`;

const DividerStyled = styled(Divider)`
  border-bottom: 1px solid #000 !important;
`;

const CardInfoDetail = (props) => {
  const FieldItem = (props) => {
    return (
      <>
        <p>
          {props.label}: <b>{props.value}</b>
        </p>
        <DividerStyled />
      </>
    );
  };

  const fields = [
    { label: 'Tên gọi gói sản phẩm', value: 'Riviera 30' },
    { label: 'Số thẻ', value: '6666 8989 2100' },
    { label: 'Tổng số dư trong tài khoản', value: '30.000.000 VNĐ' },
    { label: 'Số dư khả dụng', value: '10.000.000 VNĐ' },
    { label: 'Số đêm nghỉ khả dụng', value: '7 đêm' },
    { label: 'Thời hạn sử dụng', value: 'Không thời hạn' },
    { label: 'Cơ sở lưu trú', value: 'Cam Ranh Riviera Beach Resort & Spa' },
    { label: 'Loại phòng lưu trú', value: 'Deluxe Ocean View' },
    { label: 'Áp dụng', value: '02 người lớn + 02 trẻ em dưới 12 tuổi' },
    { label: 'Ưu đãi sử dụng dịch vụ', value: '30%' },
    { label: 'Điểm thưởng', value: '10%/năm' },
    { label: 'Đại lý bán', value: 'Đại lý Nguyễn Huệ' },
    { label: 'Ngày kích hoạt', value: '2/4/2021' }
  ];

  return (
    <ModalStyled
      closeIcon={
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ borderRadius: '99px', border: '1px solid #707070', width: '40px', height: '40px' }}>
          <CloseOutlined style={{ fontSize: '16px' }} />
        </div>
      }
      title="Thông tin chi tiết sản phẩm"
      centered
      onCancel={() => props.setVisible(false)}
      visible={props.visible}
      footer={null}>
      <DividerStyled className="m-0" style={{ position: 'relative', top: '-24px' }} />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/vninturist-assets/wp-content/uploads/2020/12/Product-4-2048x1536.png" alt="card" width="100%" />
        <p>
          <b>CBP Riviera - Riv-30</b>
        </p>
        <DividerStyled />
      </div>
      {fields.map((f, i) => (
        <FieldItem key={i} label={f.label} value={f.value} />
      ))}
    </ModalStyled>
  );
};

export default CardInfoDetail;
