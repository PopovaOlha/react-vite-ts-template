import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from '../reducers/appStateReducer';
import { api } from '../api/apiService';

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
