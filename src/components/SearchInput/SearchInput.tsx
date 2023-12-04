import React, { useState, useEffect } from 'react';
import './SearchInput.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../reducers/appStateReducer';
import { RootState } from '../../stores/store';

interface SearchInputProps {
  onSearch: (
    searchTerm: string,
    page: number,
    itemsPerPage: number,
    pageUrl: string
  ) => void;
}

function SearchInput(props: SearchInputProps) {
  const dispatch = useDispatch();
  const searchTermRedux = useSelector(
    (state: RootState) => state.appState.searchTerm
  );
  const [searchTerm, setSearchTermState] = useState(searchTermRedux);

  useEffect(() => {
    setSearchTermState(searchTermRedux);
  }, [searchTermRedux]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value.trim();
    setSearchTermState(newSearchTerm);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(searchTerm));
    localStorage.setItem('searchTerm', searchTerm);
    if (props.onSearch) {
      props.onSearch(searchTerm, 1, 10, '');
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
