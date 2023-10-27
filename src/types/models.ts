export interface SearchResult {
    name: string;
    description: string;
    image: string;
    height: string;
    mass: string;
    url: string;
  }
  
  export interface ApiResponse {
    results: any[]; 
  }