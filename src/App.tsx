import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import Main from './pages/Main';
import Details from './components/Details/Details';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/details/:itemId" element={<Details />} />
          <Route path="/:page" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
