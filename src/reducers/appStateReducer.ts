import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    searchResults: [],
    isLoading: false,
    searchTerm: '',
    pageNumber: 1,
    itemsPerPage: 10,
    imageUrl: '',
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const {
  setSearchResults,
  setIsLoading,
  setSearchTerm,
  setPageNumber,
  setItemsPerPage,
  setImageUrl,
} = appStateSlice.actions;
export default appStateSlice.reducer;
