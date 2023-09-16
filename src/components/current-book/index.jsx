import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentBook } from '../../actions/books';
import Loader from '../loader';
import './style.css';

function CurrentBook() {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { books, searchOptions } = useSelector(
    state => state.books,
  );
  const params = useParams();

  useEffect(() => {
    if (books?.length === 0) {
      navigate('/', { replace: true });
    }
  }, [books, navigate]);

  useEffect(() => {
    getCurrentBook(params.id, setBook, setLoader, setError);
  }, [params.id]);

  const currentBook = books.find(e => e.id === params.id);

  const authors = currentBook?.volumeInfo.authors?.join(', ');
  const img = Object.keys(book).length !== 0 && book.volumeInfo.imageLinks?.small;
  const title = currentBook?.volumeInfo.title;
  const categories = currentBook?.volumeInfo.categories;
  const description = currentBook?.volumeInfo.description;

  const handleClick = () => {
    navigate(`/books/${!searchOptions.category?'all':searchOptions.category}`);
  };
  
  return (
    <>
      {loader ?error?<p>Something went wrong. Reload the page</p>: <Loader /> : <section className='current-book-container'>
        <div className='img-container'>
          <img className='thumbnail' src={img || '/images/book.jpg'} alt='thumbnail' />
        </div>
        <div className='book-about-container'>
          <div className={categories ? 'categories' : 'categories-v'}>{categories}</div>
          <h3 className='title'>{title}</h3>
          <div className='authors'>{authors}</div>
          <p className={description && 'description'}>{description}</p>
        </div>
        <button onClick={handleClick} className='back-button'>back</button>
      </section>}
    </>

  );
}

export default CurrentBook;
