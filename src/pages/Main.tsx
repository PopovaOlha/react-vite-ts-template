import { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/ItemsList/ItemsList';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from '../api/api';
import ErrorFallback from '../components/errorBoundary/ErrorFallback';
import Pagination from '../components/Pagination/Pagination';
import { useAppState } from '../components/AppStateContext/AppStateContext';
import { ApiResponse } from '../types/models';
import './Main.css';

function Main() {
  const { state, dispatch } = useAppState();
  const { searchResults, isLoading } = state;

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get('page');
  const perPage = params.get('perPage');

  const handleSearch = useCallback(
    async (searchTerm: string, page: number, itemsPerPage: number) => {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      try {
        const response: ApiResponse = await searchApi.search(
          searchTerm,
          page,
          itemsPerPage
        );
        console.log('response: ', response);

        localStorage.setItem('searchTerm', searchTerm);

        dispatch({
          type: 'SET_SEARCH_RESULTS',
          payload: response.results || [],
        });
        dispatch({ type: 'SET_IS_LOADING', payload: false });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      await handleSearch(
        '',
        page === null || page === '0' ? 1 : Number(page),
        perPage === null ? 10 : Number(perPage)
      );
    };

    fetchData();
  }, [handleSearch, page, perPage]);

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
