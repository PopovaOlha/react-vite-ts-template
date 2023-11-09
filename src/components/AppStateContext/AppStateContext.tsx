import React, { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react';
import { ApiResponse } from '../../types/models';

interface AppState {
  searchResults: ApiResponse[];
  isLoading: boolean;
  searchTerm: string;
}

type Action =
  | { type: 'SET_SEARCH_RESULTS'; payload: ApiResponse[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface AppStateContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

const initialState: AppState = {
  searchResults: [],
  isLoading: false,
  searchTerm: '',
};

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};