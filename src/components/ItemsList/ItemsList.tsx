import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchResultProps } from '../../types/interfaces';
import { setImageUrl } from '../../reducers/appStateReducer';
import Loader from '../Loader/Loader';
import { SearchResult } from 'types/models';
import { RootState } from '../../stores/store';
import { IMAGE_URL } from '../../api/variables';
import './ItemsList.css';

function ItemsList(props: SearchResultProps) {
  const { isLoading, onResultClick } = props;
  const dispatch = useDispatch();
  const searchResults: SearchResult[] = useSelector(
    (state: RootState) => state.appState.searchResults
  );

  const handleItemClick = (url: string) => {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2];
    onResultClick(id);

    dispatch(setImageUrl(url));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-result-container">
          {searchResults.map((result) => (
            <div
              key={result.name}
              className="search-result-card"
              onClick={() => handleItemClick(result.url)}
            >
              <h3>{result.name}</h3>
              <p>{result.description}</p>
              <img
                src={`${IMAGE_URL}${result.url.match(/\d+/)}.jpg`}
                alt={result.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemsList;
