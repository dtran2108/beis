import React from 'react';
import { Table } from 'antd';
import strings from '~/localization';
import { currencyFormat } from 'currency';
import styled from 'styled-components';

const TableWrapStyled = styled.div`
   .even-row-styled {
   }
   width: 100%
   padding: 16px 0px 8px 0px
`;

class TableExpand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataSource: generateAutoKey(data),
      sortedInfo: null
    };
  }

  UNSAFE_componentWillReceiveProps() {
    // if (this.state.dataSource !== nextProps.dataSource) {
    //    this.setState({dataSource: generateAutoKey(nextProps.dataSource)});
    // }
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  rowClassName(r) {
    if (!r) return;
    const { selectable = false, selectedKey } = this.props;
    if (r.key % 2 !== 0) {
      // odd
      return `row-styled editable-row ${selectedKey && selectedKey === r.key ? 'selected-row' : ''} ${selectable ? 'selectable-row' : ''}`;
    } else {
      // even
      return `even-row-styled row-styled editable-row ${selectedKey && selectedKey === r.key ? 'selected-row' : ''} ${
        selectable ? 'selectable-row' : ''
      }`;
    }
  }

  render() {
    // const {dataSource} = this.state;
    const { defaultExpandAllRows = false } = this.props;

    /**
     * EXPAND
     */

    const columns = [
      {
        title: strings.crops_type,
        dataIndex: 'cropsType',
        width: '',
        key: 'cropsType'
      },
      {
        title: strings.cultivated_area,
        dataIndex: 'cultivatedArea',
        key: 'cultivatedArea',
        width: ''
      },
      {
        title: strings.classify,
        dataIndex: 'classify',
        key: 'classify',
        width: ''
      },

      {
        title: strings.yield_by_type,
        dataIndex: 'yieldByType',
        width: '',
        key: 'yieldByType'
      },
      {
        title: strings.unit_cal,
        dataIndex: 'unitCal',
        width: '',
        key: 'unitCal'
      },

      {
        title: strings.estimated_unit_price,
        dataIndex: 'estimatedUnitPrice',
        width: '',
        key: 'estimatedUnitPrice',
        render: (text) => {
          return currencyFormat(text);
        }
      },
      {
        title: strings.estimated_money,
        dataIndex: 'estimatedMoney',
        width: '',
        key: 'estimatedMoney',
        render: (text) => {
          return currencyFormat(text);
        }
      },
      {
        title: strings.note,
        dataIndex: 'note',
        width: '',
        key: 'note'
      }
    ];

    let data = [];
    let dataChildren = [];
    for (let i = 0; i < 5; ++i) {
      dataChildren.push({
        key: i,
        cropsType: '',
        cultivatedArea: '',
        classify: 'S2',
        yieldByType: '10',
        unitCal: 'Tấn',
        estimatedUnitPrice: 1000000,
        estimatedMoney: 1111111,
        note: 'no1'
      });
    }

    for (let i = 0; i < 2; ++i) {
      data.push({
        key: i,
        cropsType: 'Bơ sáp vàng',
        cultivatedArea: '50 ha',
        classify: '',
        yieldByType: '10',
        unitCal: 'Tấn',
        estimatedUnitPrice: 0,
        estimatedMoney: 0,
        note: 'no1',
        children: dataChildren
      });
    }

    const dataSource = data.map((data) => {
      let estimatedUnitPrice = 0;
      let estimatedMoney = 0;
      data.children.forEach((element) => {
        estimatedUnitPrice += element.estimatedUnitPrice;
        estimatedMoney += element.estimatedMoney;
      });
      data.estimatedUnitPrice = estimatedUnitPrice;
      data.estimatedMoney = estimatedMoney;
      return data;
    });

    return (
      <TableWrapStyled>
        <Table
          defaultExpandAllRows={defaultExpandAllRows}
          bordered={true}
          rowClassName={(r) => this.rowClassName(r)}
          dataSource={dataSource}
          columns={columns}
          showSorterTooltip={false}
          pagination={false}
        />
      </TableWrapStyled>
    );
  }
}

export default TableExpand;
