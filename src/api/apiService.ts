import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../types/models';
import { BASE_URL } from './variables';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    search: builder.query<
      ApiResponse,
      { searchTerm?: string; page: number; itemsPerPage: number }
    >({
      query: ({ searchTerm, page, itemsPerPage }) => ({
        url: '/people',
        params: searchTerm
          ? { search: searchTerm, page, itemsPerPage }
          : { page, itemsPerPage },
      }),
    }),
  }),
});

export const { useSearchQuery } = api;
