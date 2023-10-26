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