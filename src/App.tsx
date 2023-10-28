import { Component } from 'react';
import SearchInput from './components/SearchInput';
import Search from './components/SearchResult';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from './api/api';
import { SearchResult } from './types/models';
import ErrorFallback from './components/ErrorFallback';
import ErrorTestButton from './components/ErrorTestButton';

interface AppState {
  searchTerm: string;
  searchResults: SearchResult[];
  isLoading: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ searchResults: [], isLoading: true });
  
  
    try {
      const response = await searchApi.search(searchTerm);
      const results: SearchResult[] = response.map((result) => ({
        id: result.id,
        name: result.name,
        description: `Height: ${result.height || 'N/A'}, Mass: ${result.mass || 'N/A'}`,
        image:  `https://starwars-visualguide.com/assets/img/characters/${result.url.match(/\d+/)}.jpg`,
        height: result.height || 'N/A',
        mass: result.mass || 'N/A',
        url: result.url,
      }));
      this.setState({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SearchInput onSearch={this.handleSearch} />
          <Search results={this.state.searchResults} isLoading={this.state.isLoading} />
          <ErrorTestButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;