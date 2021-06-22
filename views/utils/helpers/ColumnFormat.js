import React from 'react';
import styled from 'styled-components';
const WrapColHeader = styled.div`
  .date-filter,
  .number-filter {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    min-width: 100px;
    margin-bottom: 8px !important;
  }
  .date-filter label {
    margin: 0;
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
  .filter {
    border-radius: 3px;
    border: solid 1px #707070;
    font-size: 12px;
    margin: 0;
  }
`;
export function ColumnFormat(column, colIndex, { sortElement, filterElement }) {
  return (
    <>
      <WrapColHeader className="d-flex flex-column justify-content-center align-items-center">
        <div className="mb-3">{filterElement}</div>
        <div>
          {column.text}
          {sortElement}
        </div>
      </WrapColHeader>
    </>
  );
}
