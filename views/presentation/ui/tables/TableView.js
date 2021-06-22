import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import styled from 'styled-components';

const TableWrapStyled = styled.div`
  .even-row-styled {
  }
  .expanded-row-styled {
    background: #d9f7be;
    font-weight: 550;
  }
`;

class TableExpandSelectData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataSource: generateAutoKey(props.dataSource),
      sortedInfo: null,
      expandList: []
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

  onExpand = (expanded, record) => {
    let { expandList } = this.state;
    if (expanded) {
      // true =?> add
      this.setState({ expandList: [...expandList, record.key] });
    } else {
      // // false => delete
      _.remove(expandList, (item) => item === record.key);
      this.setState({ expandList });
    }
  };

  rowClassName = (r) => {
    if (!r) return;
    const { selectable = false, selectedKey } = this.props;
    let classNameRow = `row-styled editable-row 
       ${selectedKey && selectedKey === r.key ? 'selected-row' : ''} 
       ${selectable ? 'selectable-row' : ''}`;
    if (r.key % 2 !== 0) {
      // odd
    } else {
      // even
      classNameRow += ` even-row-styled `;
    }
    if (_.findIndex(this.state.expandList, (key) => key === r.key) != -1) classNameRow += `expanded-row-styled`;
    return classNameRow;
  };

  render() {
    const { scroll, dataSource, columns } = this.props;

    /**
     * ROW SELECTION
     */
    const rowSelection = {
      onChange: () => {},
      onSelect: () => {},
      onSelectAll: () => {}
    };

    /**
     * EXPAND
     */
    // const expandedRowRender = () => {
    //    return <TableExpand />;
    // };

    return (
      <TableWrapStyled>
        <div className="w-100">
          <div className="overflow-auto">
            <Table
              rowClassName={(r) => this.rowClassName(r)}
              // expandable={{expandedRowRender}}
              onExpand={this.onExpand}
              dataSource={dataSource}
              columns={columns}
              showSorterTooltip={false}
              rowSelection={{ ...rowSelection }}
              pagination={false}
              scroll={scroll}
            />
          </div>
        </div>
      </TableWrapStyled>
    );
  }
}

export default TableExpandSelectData;
