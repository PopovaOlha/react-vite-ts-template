import axios from 'axios';
import { ApiResponse, SearchResult } from '../types/models';
import { API_URL } from './variables';

export const searchApi = {
  search: async (
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ): Promise<SearchResult[]> => {
    const params = searchTerm
      ? { search: searchTerm.trim(), page, itemsPerPage }
      : { page, itemsPerPage };
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
