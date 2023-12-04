import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/models';
import { API_URL } from './variables';

export const searchApi = {
  search: async (
    searchTerm: string,
    page: number,
    itemsPerPage: number
  ): Promise<ApiResponse> => {
    const params = searchTerm
      ? { search: searchTerm.trim(), page, itemsPerPage }
      : { page, itemsPerPage };
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(API_URL, {
        params,
      });
      console.log('Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  },
};
