/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import BTable from '~/presentation/ui/tables/BootstrapTable';
import { connect } from 'react-redux';
import { Typography, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { bookingActions } from '~/redux/booking';
import { UtilDate } from '~/views/utils/helpers';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import styled from 'styled-components';

const TrStyled = styled.div`
  .reset-expansion-style {
    * {
      transition: all 0.3s ease-in-out;
    }
  }
`;

const BookingHistory = (props) => {
  const [bookingList, setBookingList] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const columns = [
    {
      dataField: 'id',
      text: 'STT',
      sort: true,
      style: {
        minWidth: '50px',
        textAlign: 'center',
        padding: '0.75rem'
      },
      headerStyle: {
        padding: '0.75rem'
      }
    },
    {
      dataField: 'hotelName',
      text: 'Cơ sở lưu trú',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      }
    },
    {
      dataField: 'bookDate',
      text: 'Ngày Booking',
      style: {
        minWidth: '150px',
        textAlign: 'center'
      },
      formatter: (cellContent) => {
        return cellContent ? <span>{UtilDate.toDateLocal(cellContent)}</span> : <span>no ownerName</span>;
      }
    },
    {
      dataField: 'nights',
      text: 'Đêm nghỉ',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      }
    },
    {
      dataField: 'roomType',
      text: 'Loại phòng',
      style: {
        minWidth: '170px',
        textAlign: 'center'
      }
    },
    {
      dataField: 'status',
      text: 'Trạng thái',
      style: {
        minWidth: '100px',
        textAlign: 'center'
      },
      formatter: (cellContent) => {
        return (
          <div>
            <Typography>{cellContent}</Typography>
            <Button size="small" type="link" className="m-0" style={{ textTransform: 'none' }}>
              Xem chi tiết
            </Button>
          </div>
        );
      }
    },
    {
      dataField: 'actions',
      text: 'Huỷ Booking',
      style: {
        minWidth: '200px',
        textAlign: 'center',
        padding: '0.75rem'
      },
      headerStyle: {
        padding: '0.75rem'
      },
      formatter: () => {
        return (
          <Button
            size="large"
            type="link"
            danger
            shape="circle"
            className="m-0"
            icon={<CloseCircleOutlined style={{ fontSize: '24px' }} />}
          />
        );
      }
    }
  ];

  useEffect(() => {
    props
      .getBooking()
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((err) => {
        console.error('trandev ~ file: index.js ~ line 43 ~ useEffect ~ err', err);
      });
  }, []);

  const expandRow = {
    onlyOneExpanding: true,
    expanded: expanded,
    renderer: (row) => (
      <div className="mx-5 py-3 px-5" style={{ background: '#f6f6f6' }}>
        <div className="row">
          <div className="col-6">
            <p>Cơ sở lưu trú: {row.hotelName}</p>
            <p>Số đêm nghỉ: {row.nights}</p>
            <p>Check-in: {UtilDate.toDateLocal(row.checkIn)}</p>
            <p>Số người lớn: {row.adults}</p>
            <p>Họ và tên người nhận phòng: {row.name}</p>
            <p>Số điện thoại liên hệ: {row.phone}</p>
          </div>
          <div className="col-6">
            <p>Loại phòng: {row.roomType}</p>
            <p>
              Mã booking: <b>{row.id}</b>
            </p>
            <p>Check-out: {UtilDate.toDateLocal(row.checkOut)}</p>
            <p>Số trẻ em: {row.children}</p>
            <p>Số CMND/CCCD: {row.certificate}</p>
            <p>Ghi chú: {row.notes}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button className="m-0 p-0" type="link" style={{ textTransform: 'none' }} onClick={() => setExpanded([])}>
            Đóng
          </Button>
        </div>
      </div>
    )
  };

  return (
    <TrStyled>
      <AccountCardStyled title="Lịch sử booking" bordered={false}>
        <BTable data={bookingList} columns={columns} expandRow={expandRow} rowStyle={{ color: '#000' }} />
      </AccountCardStyled>
    </TrStyled>
  );
};

export default connect((state) => ({ state }), { getBooking: bookingActions.getBooking })(BookingHistory);
