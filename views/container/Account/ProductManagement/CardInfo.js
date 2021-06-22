/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import BTable from '~/presentation/ui/tables/BootstrapTable';
import { connect } from 'react-redux';
import { cardActions } from '~/redux/card';
import { packageActions } from '~/redux/package';
import { ColumnFormat } from '~/views/utils/helpers/ColumnFormat';
import { Button, Spin, Typography } from 'antd';
import CardInfoDetail from './CardInfoDetail';

const CardInfo = (props) => {
  const [cardList, setCardList] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // ------------------------------
  // LOAD DATA
  // ------------------------------
  const getCardList = (params) => {
    setLoading(true);
    props
      .getCards(params)
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
    props
      .getPackages()
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => {
        console.error('trandev ~ file: index.js ~ line 43 ~ useEffect ~ err', err);
      });
  }, []);
  // ------------------------------
  // LOAD DATA
  // ------------------------------

  const getPackagesOptions = () => {
    let res = {};
    for (const p of packages) {
      res[p.id] = p.name;
    }
    return res;
  };

  const columns = [
    {
      dataField: 'cardNumber',
      text: 'Số thẻ',
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
      dataField: 'name',
      text: 'Sản phẩm',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      headerFormatter: ColumnFormat,
      filter: selectFilter({
        options: getPackagesOptions()
      })
    },
    {
      dataField: 'status',
      text: 'Trạng thái',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      },
      headerFormatter: ColumnFormat,
      formatter: (cellContent) => {
        if (cellContent == 'http') return <Typography style={{ color: '#e61c1c' }}>Chưa kích hoạt</Typography>;
        else return <Typography style={{ color: '#083fd5' }}>Đang hoạt động</Typography>;
      },
      filter: selectFilter({
        options: {
          http: 'Chưa kích hoạt',
          https: 'Đang hoạt động'
        }
      })
    },
    {
      dataField: 'availableBalance',
      text: 'Số dư khả dụng',
      style: {
        minWidth: '200px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      }
    },
    {
      dataField: 'leftBalance',
      text: 'Số dư còn lại',
      style: {
        minWidth: '170px',
        textAlign: 'center'
      },
      headerStyle: {
        textAlign: 'center'
      }
    },
    {
      dataField: 'points',
      text: 'Điểm thưởng',
      style: {
        minWidth: '100px',
        textAlign: 'center',
        padding: '0.75rem'
      },
      headerStyle: {
        textAlign: 'center',
        padding: '0.75rem'
      }
    },
    {
      dataField: 'actions',
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
          <Button
            onClick={() => setModalVisible(true)}
            className="p-0 m-0"
            type="link"
            style={{ color: '#074494', textDecoration: 'none', textTransform: 'none' }}>
            Chi tiết
          </Button>
        );
      }
    }
  ];

  return (
    <AccountCardStyled title="Thông tin thẻ" bordered={false} style={{ minHeight: '300px' }}>
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
          Xem thêm
        </Button>
      )}
      <CardInfoDetail visible={modalVisible} setVisible={setModalVisible} />
    </AccountCardStyled>
  );
};

export default connect((state) => ({ state }), {
  getCards: cardActions.getCards,
  getPackages: packageActions.getPackages
})(CardInfo);
