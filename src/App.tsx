import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/store';
import Main from './pages/Main';
import Details from './components/Details/Details';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function App() {
  const router = useRouter();
  const { query, asPath } = router;
  const { itemId } = query;

  return (
    <Provider store={store}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/main">
          <a>Main</a>
        </Link>
        {itemId && (
          <Link href="/details/[itemId]" as={`/details/${itemId}`}>
            <a>Details</a>
          </Link>
        )}

        <button onClick={() => router.push('/main')}>Go to Main</button>

        {asPath === '/' && <Main />}
        {asPath.startsWith('/details/') && <Details />}
      </div>
    </Provider>
  );
}

export default App;
