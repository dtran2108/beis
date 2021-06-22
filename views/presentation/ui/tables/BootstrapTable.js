/* eslint-disable react/display-name */
import PropsType from 'prop-types';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { NoRecordsFoundMessage, PleaseWaitMessage } from '~/views/presentation/ui/metronic/TablePaginationHelpers';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

function BTable(props) {
  const { data, columns, onTableChange, expandRow, onClickCreateNew, rowStyle } = props;

  return (
    <ToolkitProvider keyField="id" data={data || []} columns={columns}>
      {(propsToolkit) => {
        props.callExport && propsToolkit?.csvProps?.onExport();
        props.callExport && props.setCallExport(false);
        return (
          <div style={{ position: 'relative' }}>
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              hover
              headerClasses="table-header-class"
              classes="table table-head-custom table-vertical-center overflow-hidden"
              {...propsToolkit.baseProps}
              onTableChange={onTableChange}
              filter={filterFactory()}
              expandRow={expandRow}
              rowStyle={rowStyle}
              filterPosition="inline"></BootstrapTable>
            <PleaseWaitMessage loading={false} />
            <NoRecordsFoundMessage data={data} onClick={onClickCreateNew} />
          </div>
        );
      }}
    </ToolkitProvider>
  );
}
BTable.defaultProps = {
  isLoading: false
};

BTable.propTypes = {
  data: PropsType.array.isRequired,
  columns: PropsType.array.isRequired,
  onChangeTable: PropsType.func,
  paginationOptions: PropsType.object.isRequired
};

export default BTable;
