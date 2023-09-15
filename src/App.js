import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home-page';
import BooksPage from './components/books-page';
import CurrentBook from './components/current-book';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='books/:category' element={<BooksPage />} />
      <Route path='books/:category/:id' element={<CurrentBook />} /> 
    </Routes>
  );
}

export default App;
