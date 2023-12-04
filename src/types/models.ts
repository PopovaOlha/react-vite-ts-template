export interface SearchResult {
  id: string;
  name: string;
  description: string;
  image: string;
  height: string;
  mass: string;
  url: string;
}

export interface ApiResponse {
  results: SearchResult[];
  count: number;
}
