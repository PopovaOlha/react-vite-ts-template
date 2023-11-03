import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/SearchResult/SearchResult';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from '../api/api';
import { SearchResult as ApiResponse } from '../types/models';
import ErrorFallback from '../components/ErrorBoundary/ErrorFallback';
import ErrorTestButton from '../components/ErrorTestButton/ErrorTestButton';
import { IMAGE_URL } from '../api/variables';
import Pagination from '../components/Pagination/Pagination';

function Main() {
  const [searchResults, setSearchResults] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      handleSearch(savedSearchTerm, currentPage);
    } else {
      handleSearch('', currentPage);
    }
  }, [location]);

  const handleSearch = async (searchTerm: string, page: number) => {
    setSearchResults([]);
    setIsLoading(true);
    setSearchTerm(searchTerm);

    try {
      const response = await searchApi.search(searchTerm, page, itemsPerPage);
      const results: ApiResponse[] = response.map((result) => ({
        id: result.id,
        name: result.name,
        description: `Height: ${result.height || 'N/A'}, Mass: ${
          result.mass || 'N/A'
        }`,
        image: `${IMAGE_URL}${result.url.match(/\d+/)}.jpg`,
        height: result.height || 'N/A',
        mass: result.mass || 'N/A',
        url: result.url,
      }));

      localStorage.setItem('searchTerm', searchTerm);

      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/main?page=${page}`);
    handleSearch(searchTerm, page);
  };

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SearchInput onSearch={handleSearch} />
        <Search results={searchResults} isLoading={isLoading} />
        <ErrorTestButton />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(searchResults.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Main;
