import { useAppState } from '../AppStateContext/AppStateContext';
import Loader from '../Loader/Loader';
import './ItemsList.css';
import { SearchResultProps } from '../../types/interfaces';
import { IMAGE_URL } from '../../api/variables';

function SearchResult(props: SearchResultProps) {
  const { isLoading, onResultClick } = props;
  const { state } = useAppState();
  const { searchResults } = state;

  const handleItemClick = (url: string) => {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2];
    onResultClick(id);
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

export default SearchResult;
