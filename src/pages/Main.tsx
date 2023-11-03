import { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/SearchResult/SearchResult';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from '../api/api';
import { SearchResult as ApiResponse } from '../types/models';
import ErrorFallback from '../components/ErrorBoundary/ErrorFallback';
import ErrorTestButton from '../components/ErrorTestButton/ErrorTestButton';
import { IMAGE_URL } from '../api/variables';

function Main() {
  const [searchResults, setSearchResults] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      handleSearch(savedSearchTerm);
    } else {
      handleSearch('');
    }
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setSearchResults([]);
    setIsLoading(true);

    try {
      const response = await searchApi.search(searchTerm);
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

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SearchInput onSearch={handleSearch} />
        <Search results={searchResults} isLoading={isLoading} />
        <ErrorTestButton />
      </ErrorBoundary>
    </div>
  );
}

export default Main;