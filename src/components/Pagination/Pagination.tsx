import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange } = props;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1); 
          }
        }}
      >
        Предыдущая
      </button>
      {getPageNumbers().map((page) => (
        <Link to={`/main?page=${page}`} key={page}>
          <button onClick={() => onPageChange(page)}>{page}</button>
        </Link>
      ))}
      <button  disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1); 
          }
        }}
      >
    следующая
      </button>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <option value="10">10 на странице</option>
        <option value="20">20 на странице</option>
        <option value="30">30 на странице</option>
      </select>
    </div>
  );
}

export default Pagination