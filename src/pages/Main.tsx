import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchQuery } from '../api/apiService';
import ErrorFallback from '../components/errorBoundary/ErrorFallback';
import SearchInput from '../components/SearchInput/SearchInput';
import Search from '../components/ItemsList/ItemsList';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { setSearchResults, setIsLoading } from '../reducers/appStateReducer';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get('page') || '1';
  const perPage = params.get('perPage') || '10';

  const searchTerm = params.get('search') || '';

  const { data: searchResults, isLoading } = useSearchQuery({
    searchTerm: searchTerm,
    page: Number(page),
    itemsPerPage: Number(perPage),
  });

  useEffect(() => {
    dispatch(setIsLoading(true));

    if (searchResults) {
      dispatch(setSearchResults(searchResults.results || []));
      dispatch(setIsLoading(false));
    }
  }, [dispatch, searchResults]);

  const handleResultClick = (itemId: string) => {
    navigate(`/details/${itemId}`);
  };

  return (
    <div className="main-container">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SearchInput
          onSearch={(newSearchTerm) =>
            navigate(
              `/?search=${encodeURIComponent(
                newSearchTerm
              )}&page=${page}&perPage=${perPage}`
            )
          }
        />
        <Search
          results={searchResults?.results || []}
          isLoading={isLoading}
          onResultClick={handleResultClick}
        />
        <Pagination
          totalPages={
            searchResults ? Math.ceil(searchResults.count / Number(perPage)) : 0
          }
          page={Number(page)}
          totalResults={searchResults ? searchResults.count : 0}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Main;
