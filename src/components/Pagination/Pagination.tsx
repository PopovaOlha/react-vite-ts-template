import { useSearchParams } from 'react-router-dom';
import { PaginationProps } from '../../types/interfaces';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import './Pagination.css';

function Pagination(props: PaginationProps) {
  const { totalPages, page } = props;
  const [searchParam, setParams] = useSearchParams();
  const itemsPerPage = searchParam.get('perPage');

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const setPage = (page: string) => {
    setParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };
  const setPerPage = (perPage: string) => {
    setParams((prev) => {
      prev.set('perPage', perPage);
      return prev;
    });
  };

  return (
    <div className="pagination">
      <ErrorTestButton />
      <button
        className="pagination-button"
        disabled={page === 1}
        onClick={() => {
          if (page > 1) {
            setPage((page - 1).toString());
          }

          page === 0 ? setPage('1') : setPage((page - 1).toString());
        }}
      >
        Previos
      </button>
      {getPageNumbers().map((page) => (
        <button className="pagination-number" key={page}>
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        onClick={() => {
          page === 0 ? setPage('1') : setPage((page + 1).toString());
        }}
      >
        Next
      </button>
      <select
        className="pagination-select"
        value={itemsPerPage || 10}
        onChange={(e) => setPerPage(e.target.value)}
      >
        <option value="10">10 on the page</option>
        <option value="20">20 on the page</option>
        <option value="30">30 on the page</option>
      </select>
    </div>
  );
}

export default Pagination;
