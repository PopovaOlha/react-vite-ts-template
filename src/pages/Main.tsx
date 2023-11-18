import { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/ItemsList/ItemsList';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from '../api/api';
import ErrorFallback from '../components/errorBoundary/ErrorFallback';
import Pagination from '../components/Pagination/Pagination';
import { ApiResponse } from '../types/models';
import './Main.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setIsLoading } from '../reducers/appStateReducer';
import { RootState } from 'stores/store';

function Main() {
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector(
    (state: RootState) => state.appState
  );

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get('page');
  const perPage = params.get('perPage');

  const handleSearch = useCallback(
    async (searchTerm: string, page: number, itemsPerPage: number) => {
      dispatch(setIsLoading(true));
      try {
        const response: ApiResponse = await searchApi.search(
          searchTerm,
          page,
          itemsPerPage
        );
        console.log('response: ', response);

        localStorage.setItem('searchTerm', searchTerm);

        dispatch(setSearchResults(response.results || []));
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error(error);
        dispatch(setIsLoading(false));
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
