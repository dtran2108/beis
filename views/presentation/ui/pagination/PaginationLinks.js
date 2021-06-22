/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { getPages, getPagesCount } from '~/views/presentation/ui/metronic/TablePaginationHelpers';

const GoInput = styled.div`
  width: 70px;

  .form-control {
    height: calc(1.35em + 1.1rem + 2px);
    border-radius: 0.22rem;
  }
`;

export function PaginationLinks({ paginationProps, noGoto }) {
  const { totalSize, sizePerPage, page, paginationSize } = paginationProps;
  const pagesCount = getPagesCount(totalSize, sizePerPage);
  const pages = getPages(page, pagesCount, paginationSize);
  const handleFirstPage = ({ onPageChange }) => {
    onPageChange(1);
  };

  const handlePrevPage = ({ page, onPageChange }) => {
    onPageChange(page - 1);
  };

  const handleNextPage = ({ page, onPageChange }) => {
    if (page < pagesCount) {
      onPageChange(page + 1);
    }
  };

  const handleLastPage = ({ onPageChange }) => {
    onPageChange(pagesCount);
  };

  const handleSelectedPage = ({ onPageChange }, pageNum) => {
    onPageChange(pageNum);
  };

  const handleGoPage = ({ onPageChange }, event) => {
    if (event.keyCode === 13) {
      if (event.target.value > 0 && event.target.value <= pagesCount) {
        onPageChange(event.target.value);
      } else {
        onPageChange(1);
      }
      event.target.value = '';
    }
  };

  const disabledClass = pagesCount > 1 ? '' : 'disabled';
  return (
    <>
      {pagesCount < 2 && <></>}
      {pagesCount > 1 && (
        <>
          <div className="d-flex justify-content-start align-items-center">
            <div className={`d-flex flex-wrap py-2 mr-3 ${disabledClass}`}>
              <a onClick={() => handleFirstPage(paginationProps)} className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1">
                <i className="ki ki-bold-double-arrow-back icon-xs" />
              </a>
              <a onClick={() => handlePrevPage(paginationProps)} className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1">
                <i className="ki ki-bold-arrow-back icon-xs" />
              </a>

              {page > 1 && <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>}
              {pages.map((p) => (
                <a
                  key={p}
                  onClick={() => handleSelectedPage(paginationProps, p)}
                  className={`btn btn-icon btn-sm border-0 btn-light ${page === p ? ' btn-hover-primary active' : ''} mr-2 my-1`}>
                  {p}
                </a>
              ))}
              {page < pagesCount && <a className="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>}
              <a onClick={() => handleNextPage(paginationProps)} className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1">
                <i className="ki ki-bold-arrow-next icon-xs"></i>
              </a>
              <a onClick={() => handleLastPage(paginationProps)} className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1">
                <i className="ki ki-bold-double-arrow-next icon-xs"></i>
              </a>
            </div>
            <span className="mr-2">Go to </span>
            <GoInput className="input-group-solid">
              <input
                type="number"
                placeholder="1"
                className="form-control  form-control-solid"
                onKeyDown={(e) => handleGoPage(paginationProps, e)}
                min={0}
                max={pagesCount}
              />
            </GoInput>
          </div>
        </>
      )}
    </>
  );
}
