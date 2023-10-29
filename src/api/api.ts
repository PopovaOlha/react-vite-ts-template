import axios from 'axios';
import { ApiResponse, SearchResult } from '../types/models';
import { API_URL } from './config';

export const searchApi = {
  search: async (searchTerm: string): Promise<SearchResult[]> => {
    const params = searchTerm ? { search: searchTerm.trim() } : {};
    try {
      const response = await axios.get<ApiResponse>(API_URL, { params });
      console.log('Response:', response);
      return response.data.results.map((result) => ({
        id: result.id,
        name: result.name,
        description: `Height: ${result.height}, Mass: ${result.mass}`,
        image: result.image,
        height: result.height,
        mass: result.mass,
        url: result.url,
      }));
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  },
};
