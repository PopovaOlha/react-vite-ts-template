import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Details from './components/Details/Details';
import { AppStateProvider } from './components/AppStateContext/AppStateContext';
import React from 'react';

function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/details/:itemId" element={<Details />} />
          <Route path="/:page" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;
