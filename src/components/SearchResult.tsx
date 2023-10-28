import { SearchResultProps } from "../types/interfaces";

const SearchResult: React.FC<SearchResultProps> = ({ results, isLoading }) => {
    return (
      <div>
      {isLoading ? (
        <div>Loading...</div> 
      ) : (
        <div>
          {results.map((result, index) => (
            <div key={index}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
              <img src={result.image} alt={result.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
  };
  
  export default SearchResult;