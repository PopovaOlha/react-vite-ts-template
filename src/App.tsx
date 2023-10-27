import { Component } from 'react';
import SearchInput from './components/SearchInput';
import Search from './components/SearchResult';
import ErrorBoundary from './components/ErrorBoundary';
import { searchApi } from './api/api';
import { SearchResult } from './types/models';

interface AppState {
  searchTerm: string;
  searchResults: SearchResult[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ searchResults: [] });

    try {
      const response = await searchApi.search(searchTerm);
      const results: SearchResult[] = response.map((result) => ({
        name: result.name,
        description: `Height: ${result.height}, Mass: ${result.mass}`,
        image: `https://starwars-visualguide.com/assets/img/characters/${result.url.match(/\d+/)}.jpg`,
      }));
      this.setState({ searchResults: results });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Search App</h1>
        <ErrorBoundary>
          <SearchInput onSearch={this.handleSearch} />
          <Search results={this.state.searchResults} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
