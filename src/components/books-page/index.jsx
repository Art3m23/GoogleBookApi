import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { getMoreBooks } from '../../actions/books';
import Loader from '../loader';
import Header from '../header';
import BookCard from '../book-card';
import { INITIAL_VALUES, MAX_RESULTS } from '../../constants';
import './style.css';

function BooksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { books, searchOptions, isFetching, isLoading, totalItems } = useSelector(
    state => state.books
  );

  useEffect(() => {
    if (!isFetching && books?.length === 0) {
      navigate('/', { replace: true });
    }
  }, [books, isFetching, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getMoreBooks({ ...searchOptions, startIndex: searchOptions.startIndex + MAX_RESULTS }));
  }
  
  return (
    <>
      <Header initialValues={INITIAL_VALUES} />
      {isFetching ? <Loader /> : <section className='section-books'>
        <p className='total'>total found {totalItems}</p>
        <div className='books-container'>
          {
            books?.length > 0 &&
            books.map((el, i) => {
              return <Link key={i} to={`/books/${params.category}/${el.id}`}><BookCard item={el} /></Link>
            })
          }
        </div>
        <button onClick={handleClick} className='load-button'>{isLoading ? 'Loading...' : 'load more'}</button>
      </section>}
    </>
  );
}

export default BooksPage;
