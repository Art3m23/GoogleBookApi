import React from 'react';
import Header from '../header';
import { INITIAL_VALUES } from '../../constants';
import './style.css';

function HomePage() {
  
  return (
    <>
      <Header initialValues={INITIAL_VALUES}/>
      <main>
        <p className='description'>This books search app works using the Google Books API</p>
      </main>
    </>
  );
}

export default HomePage;
