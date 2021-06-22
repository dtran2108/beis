import React, { PureComponent } from 'react';
import { TableStyle } from './styles';

class UITable extends PureComponent {
  state = {
    selectedRowKeys: this.props.selectedRowKeys || [] // take selectedRowKeys props from outside
  };

  onSelectChange = (selectedRowKeys) => {
    // if props is controlled from outside, don't setState
    if (!this.props.selectedRowKeys) {
      this.setState({ selectedRowKeys });
    } else this.props.handleRowSelect(selectedRowKeys);
  };

  onTableChange = (tableObj, filters, sorter) => {
    // return row state to outside
    if (this.props.rowSelectable) {
      if (!this.props.selectedRowKeys && this.props.handleRowSelect) {
        this.props.handleRowSelect([]);
      } else {
        this.setState({ selectedRowKeys: [] });
      }
    }
    const baseObj = {
      ...tableObj,
      current: tableObj.current
    };

    this.props.handleTableChange && this.props.handleTableChange(baseObj, filters, sorter);
  };

  render() {
    const { data, columns, pagination, loading, rowSelectable, footer, rowKey, ...rest } = this.props;

    // to control selected row state from outside
    const selectedRowKeys = this.props.selectedRowKeys ? this.props.selectedRowKeys : this.state.selectedRowKeys;

    const rowSelection = rowSelectable
      ? {
          selectedRowKeys,
          onChange: this.onSelectChange
        }
      : null;

    const tablePaging = pagination
      ? {
          ...pagination,
          current: pagination.current
        }
      : false;

    return (
      <TableStyle
        columns={columns}
        rowKey={(record) => record[rowKey]}
        dataSource={data}
        pagination={tablePaging}
        loading={loading}
        onChange={this.onTableChange}
        // locale={{ emptyText: "Empty Data" }}
        rowSelection={rowSelection}
        footer={footer}
        {...rest}
      />
    );
  }
}

UITable.defaultProps = {
  rowSelectable: false,
  rowKey: '_id'
};

export default UITable;
