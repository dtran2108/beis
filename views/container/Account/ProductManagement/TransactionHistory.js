/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { dateFilter, selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import BTable from '~/presentation/ui/tables/BootstrapTable';
import { connect } from 'react-redux';
import { cardActions } from '~/redux/card';
import { packageActions } from '~/redux/package';
import { ColumnFormat } from '~/views/utils/helpers/ColumnFormat';
import { Button, Spin, Typography } from 'antd';
import { UtilDate } from '~/utils/helpers';

const TransactionHistory = (props) => {
  const [cardList, setCardList] = useState([]);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // LOAD DATA
  // ------------------------------
  const getCardList = (params) => {
    setLoading(true);
    props
      .getCardTransaction(params)
      .then((res) => {
        setCardList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('trandev ~ file: index.js ~ line 43 ~ useEffect ~ err', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCardList({ page: 1, limit: 2 });
  }, []);
  // ------------------------------
  // LOAD DATA
  // ------------------------------

  const columns = [
    {
      dataField: 'chargeDate',
      text: 'Ngày giao dịch',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      formatter: (cellContent) => {
        return <span>{UtilDate.toDateLocal(cellContent)}</span>;
      },
      headerFormatter: ColumnFormat,
      filter: dateFilter()
    },
    {
      dataField: 'serviceName',
      text: 'Loại giao dịch',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      headerFormatter: ColumnFormat,
      filter: textFilter()
    },
    {
      dataField: 'amount',
      text: 'Số tiền giao dịch',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      headerFormatter: ColumnFormat,
      filter: textFilter()
    },
    {
      dataField: 'cardNumber',
      text: 'Thẻ',
      headerFormatter: ColumnFormat,
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      filter: textFilter()
    },
    {
      dataField: 'paymentMethod',
      text: 'Hình thức thanh toán',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerFormatter: ColumnFormat,
      headerStyle: {
        textAlign: 'center'
      },
      formatter: (cellContent) => {
        if (cellContent == 'http') return <Typography>Tiền mặt</Typography>;
        else return <Typography>Điểm thưởng</Typography>;
      },
      filter: selectFilter({
        options: {
          http: 'Tiền mặt',
          https: 'Điểm thưởng'
        }
      })
    },
    {
      dataField: 'actions',
      text: 'Chi tiết',
      style: {
        minWidth: '100px',
        textAlign: 'center',
        padding: '0.75rem'
      },
      headerStyle: {
        textAlign: 'center',
        padding: '0.75rem'
      },
      formatter: (cellContent, row) => {
        return (
          <Button className="p-0 m-0" type="link" style={{ color: '#074494', textDecoration: 'none', textTransform: 'none' }}>
            Chi tiết
          </Button>
        );
      }
    }
  ];

  return (
    <AccountCardStyled title="Lịch sử giao dịch" bordered={false} style={{ minHeight: '300px' }}>
      <BTable data={cardList} columns={columns} />
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Spin />
        </div>
      )}
      {!isLoadAll && (
        <Button
          style={{ textTransform: 'none' }}
          type="link"
          onClick={() => {
            getCardList();
            setIsLoadAll(true);
          }}>
          Xem tất cả &gt;&gt;
        </Button>
      )}
    </AccountCardStyled>
  );
};

export default connect((state) => ({ state }), {
  getCardTransaction: cardActions.getCardTransaction,
  getPackages: packageActions.getPackages
})(TransactionHistory);
