import { SearchResult } from './models';

export interface ErrorBoundaryProps {
  FallbackComponent: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

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
    url: string;
    name: string;
    description: string;
    image: string;
  }[];
  isLoading: boolean;
  onResultClick: (url: string) => void;
}

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
  totalResults: number;
  totalPages: number;
  page: number;
}
