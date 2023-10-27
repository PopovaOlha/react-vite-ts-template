import { SearchResult } from "./models";

export interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
  }
  
export interface SearchInputState {
    searchTerm: string;
  }

export interface SearchResultProps {
    results: SearchResult[];
  }

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface AppState {
  searchTerm: string;
  searchResults: SearchResult[];
}