import React from 'react';
import { useAppState } from '../AppStateContext/AppStateContext';
import { SearchInputProps } from '../../types/interfaces';
import './SearchInput.css';

function SearchInput(props: SearchInputProps) {
  const { state, dispatch } = useAppState();
  const { searchTerm } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value.trim();
    dispatch({ type: 'SET_SEARCH_TERM', payload: newSearchTerm });
  };

  const handleSearch = () => {
    props.onSearch(searchTerm, 1, 10, '');
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
