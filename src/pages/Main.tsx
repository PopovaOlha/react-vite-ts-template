import { useState, useEffect } from 'react';
import './Main.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/SearchResult/SearchResult';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from '../api/api';
import { SearchResult as ApiResponse } from '../types/models';
import ErrorFallback from '../components/errorBoundary/ErrorFallback';
import Pagination from '../components/Pagination/Pagination';

function Main() {
  const [searchResults, setSearchResults] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const page = params.get('page');
  const perPage = params.get('perPage');
  console.log('page: ', page);

  useEffect(() => {
    handleSearch(
      '',
      page === null || page === '0' ? 1 : Number(page),
      perPage === null || '10' ? Number(page) : 10
    );
  }, [page, perPage]);

  const handleSearch = async (
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ) => {
    setIsLoading(true);
    try {
      const response = await searchApi.search(searchTerm, page, itemsPerPage);
      console.log('response: ', response);

      localStorage.setItem('searchTerm', searchTerm);

      setSearchResults(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleResultClick = (itemId: string) => {
    navigate(`/details/${itemId}`);
  };

  return (
    <div className="main-container">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SearchInput onSearch={handleSearch} />
        <Search
          results={searchResults}
          isLoading={isLoading}
          onResultClick={handleResultClick}
        />
        <Pagination
          totalPages={
            perPage ? Math.ceil(searchResults.length / Number(perPage)) : 0
          }
          page={page === null ? 0 : Number(page)}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Main;
