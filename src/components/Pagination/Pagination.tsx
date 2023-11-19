import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PaginationProps } from '../../types/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, setItemsPerPage } from '../../reducers/appStateReducer';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import './Pagination.css';
import { RootState } from '../../stores/store';

function Pagination(props: PaginationProps) {
  const { totalPages } = props;
  const [searchParam, setParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = Number(searchParam.get('page')) || 1;
  const itemsPerPage = useSelector(
    (state: RootState) => state.appState.itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const setPage = (newPage: number) => {
    dispatch(setPageNumber(newPage));
    setParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
    navigate(`/main?page=${newPage}&perPage=${itemsPerPage}`);
  };

  const setPerPage = (newPerPage: number) => {
    dispatch(setItemsPerPage(newPerPage));
    setParams((prev) => {
      prev.set('perPage', newPerPage.toString());
      return prev;
    });
    navigate(`/main?page=${page}&perPage=${newPerPage}`);
  };

  return (
    <div className="pagination">
      <ErrorTestButton />
      <button
        className="pagination-button"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pagination-number ${
            pageNumber === +page ? 'active' : ''
          }`}
          onClick={() => setPage(page)}
        >
          {pageNumber}
        </button>
      ))}
      <button className="pagination-button" onClick={() => setPage(page + 1)}>
        Next
      </button>
      <select
        className="pagination-select"
        value={itemsPerPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
      >
        <option value="10">10 on the page</option>
        <option value="20">20 on the page</option>
        <option value="30">30 on the page</option>
      </select>
    </div>
  );
}

export default Pagination;
