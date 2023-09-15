import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBooks } from '../../actions/books';
import { SORT_LIST, CATEGORY_LIST } from '../../constants';
import './style.css';

function Header({ initialValues }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBooks(values));
    navigate(`/books/${values.category ? values.category : 'all'}`);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <header className="container">
      <h2>Search for books</h2>
      <form onSubmit={handleSubmit}>
        <div className="searchContainer">
          <input className='searchTerm' type="search" placeholder="Search for books" id="book" name='searchTerm' value={values.searchTerm} onChange={handleChange} required />
          <input className='submit-button' type='submit' value=''/>
        </div>
        <div className="selectContainer">
          <div>
            <label htmlFor="category">categories</label>
            <select defaultValue={'all'} className="category" name='category' id="category" onChange={handleChange}>
              <option value="DEFAULT" disabled>Select a category</option>
              {
                CATEGORY_LIST.map(el => {
                  return <option key={el.id} value={el.value}>{el.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="sort">sorting by</label>
            <select defaultValue={'relevance'} className="sort" name='sort' id="sort" onChange={handleChange}>
              <option value="DEFAULT" disabled>Select a category</option>
              {
                SORT_LIST.map(el => {
                  return <option key={el.id} value={el.value}>{el.name}</option>
                })
              }
            </select>
          </div>
        </div>
      </form>
    </header>
  );
}

export default Header;
