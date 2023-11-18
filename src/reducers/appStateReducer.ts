import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    searchResults: [],
    isLoading: false,
    searchTerm: '',
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
  },
});

export const { setSearchResults, setIsLoading, setSearchTerm } =
  appStateSlice.actions;
export default appStateSlice.reducer;
