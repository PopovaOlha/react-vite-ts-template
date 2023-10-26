
import './App.css'
import SearchInput from './components/SearchInput'

function App() {

  return (
    <>
    <SearchInput onSearch={function (searchTerm: string): void {
        throw new Error('Function not implemented.')
      } } /> 
    </>
  )
}

export default App
