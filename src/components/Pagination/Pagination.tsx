import { PaginationProps } from '../../types/interfaces';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import './Pagination.css';

function Pagination(props: PaginationProps) {
  const {
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
  } = props;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <ErrorTestButton />
      <button
        className="pagination-button"
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
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
          if (currentPage > 1 || currentPage === 1) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        Next
      </button>
      <select
        className="pagination-select"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <option value="10">10 on the page</option>
        <option value="20">20 on the page</option>
        <option value="30">30 on the page</option>
      </select>
    </div>
  );
}

export default Pagination;
