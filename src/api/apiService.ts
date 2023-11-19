import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './variables';
import { ApiResponse } from 'types/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    search: builder.query<
      ApiResponse,
      { searchTerm: string; page: number; itemsPerPage: number }
    >({
      query: ({ searchTerm, page, itemsPerPage }) =>
        `?search=${searchTerm}&page=${page}&perPage=${itemsPerPage}`,
    }),
  }),
});

export const { useSearchQuery } = api;
