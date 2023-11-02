import Loader from '../Loader/Loader';
import './SearchResult.css';
import { SearchResultProps } from '../../types/interfaces';

function SearchResult(props: SearchResultProps) {
  const { results, isLoading } = props;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-result-container">
          {results.map((result) => (
            <div key={result.name} className="search-result-card">
              <h3>{result.name}</h3>
              <p>{result.description}</p>
              <img src={result.image} alt={result.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
