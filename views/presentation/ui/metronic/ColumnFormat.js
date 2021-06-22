import React from 'react';
import styled from 'styled-components';
const WrapColHeader = styled.div`
  .date-filter,
  .number-filter {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    min-width: 100px;
  }

  .date-filter-comparator {
    display: none;
  }
  .number-filter-comparator {
    display: none;
  }

  .filter-label {
    // display: none;
    // min-width: 72px;
  }
`;
export function ColumnFormat(column, colIndex, { sortElement, filterElement }) {
  return (
    <WrapColHeader className="d-flex flex-column ">
      <div className="mb-2">
        {column.text}
        {sortElement}
      </div>
      {filterElement}
    </WrapColHeader>
  );
}
