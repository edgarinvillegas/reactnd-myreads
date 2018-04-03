import React from 'react';

import BookList from './BookList';
import './MyLibrary.css';

const MyLibrary = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads Static</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookList />
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  );
};

export default MyLibrary;