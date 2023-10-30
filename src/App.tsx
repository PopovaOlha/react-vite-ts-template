import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import Search from './components/SearchResult/SearchResult';
import { ErrorBoundary } from 'react-error-boundary';
import { searchApi } from './api/api';
import { SearchResult } from './types/models';
import ErrorFallback from './components/ErrorFallback';
import ErrorTestButton from './components/ErrorTestButton/ErrorTestButton';
import { AppState } from './types/interfaces';
import { IMAGE_URL } from './api/variables';

class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.handleSearch(savedSearchTerm);
    } else {
      this.handleSearch('');
    }
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ searchResults: [], isLoading: true });
    const limit = 30;

    try {
      const response = await searchApi.search(searchTerm, limit);
      const results: SearchResult[] = response.map((result) => ({
        id: result.id,
        name: result.name,
        description: `Height: ${result.height || 'N/A'}, Mass: ${
          result.mass || 'N/A'
        }`,
        image: `${IMAGE_URL}${result.url.match(/\d+/)}.jpg`,
        height: result.height || 'N/A',
        mass: result.mass || 'N/A',
        url: result.url,
      }));

      localStorage.setItem('searchTerm', searchTerm);

      this.setState({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SearchInput onSearch={this.handleSearch} />
          <Search
            results={this.state.searchResults}
            isLoading={this.state.isLoading}
          />
          <ErrorTestButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
