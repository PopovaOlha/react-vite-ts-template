import { SearchResultProps } from "../types/interfaces";

const SearchResult: React.FC<SearchResultProps> = ({ results }) => {
    return (
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default SearchResult;