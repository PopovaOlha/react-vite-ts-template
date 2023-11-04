import React, { useState } from 'react';
import './SearchInput.css';
import { SearchInputProps } from '../../types/interfaces';

function SearchInput(props: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSearch = () => {
    props.onSearch(searchTerm,  1, 10, '');
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
