import React from 'react';
import './style.css';

function BookCard({ item }) {
  const imageLinks = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/images/book.jpg';
  const categories = item.volumeInfo.categories ? item.volumeInfo.categories[0] : '';
  const title = item.volumeInfo.title ? item.volumeInfo.title : '';
  const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(' / ') : '';

  return (
    <>
      <div className="card">
        <img src={imageLinks} alt="book" />
        <h3 className="category-name">{categories}</h3>
        <h3 className="title">{title}</h3>
        <p>{authors}</p>
      </div>
    </>
  );
}

export default BookCard