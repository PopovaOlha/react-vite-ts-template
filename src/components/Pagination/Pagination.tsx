import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;
  console.log(currentPage);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page) => (
        <Link to={`/main?page=${page}`} key={page}>
          <button onClick={() => onPageChange(page)}>{page}</button>
        </Link>
      ))}
    </div>
  );
}

export default Pagination;
