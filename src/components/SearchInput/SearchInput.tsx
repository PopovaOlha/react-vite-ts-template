import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../reducers/appStateReducer';
import { RootState } from '../../stores/store';

import { SearchInputProps } from '../../types/interfaces';
import './SearchInput.css';

function SearchInput(props: SearchInputProps) {
  const dispatch = useDispatch();
  const searchTerm = useSelector(
    (state: RootState) => state.appState.searchTerm
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value.trim();
    dispatch(setSearchTerm(newSearchTerm));
  };

  const handleSearch = () => {
    if (props.onSearch) {
      props.onSearch(searchTerm, 1, 10, '');
    }

    localStorage.setItem('searchTerm', searchTerm);
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
