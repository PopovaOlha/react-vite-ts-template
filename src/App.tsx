import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Details from './components/Details/Details';
import { AppStateProvider } from './components/AppStateContext/AppStateContext';

function App() {
  return (
    <AppStateProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/details/:itemId" element={<Details />} />
        <Route path="/:page" element={<Main />} />
      </Routes>
    </AppStateProvider>
  );
}

export default App;
