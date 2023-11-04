import { SearchResult } from './models';

export interface SearchInputProps {
  onSearch: (
    searchTerm: string,
    page: number,
    itemsPerPage: number,
    pageUrl: string
  ) => void;
}

export interface SearchInputState {
  searchTerm: string;
}

export interface SearchResultProps {
  results: {
    name: string;
    description: string;
    image: string;
  }[];
  isLoading: boolean;
}

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface AppState {
  searchTerm: string;
  searchResults: SearchResult[];
  isLoading: boolean;
}

export interface HeroCardProps {
  hero: {
    name: string;
    description: string;
    image: string;
  };
  onClose: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}
