import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from '../reducers/appStateReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  appState: appStateReducer,
});

const store = configureStore({
  reducer: {
    appState: appStateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
