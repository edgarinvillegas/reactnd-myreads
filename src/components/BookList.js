import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';
import './BookList.css';

const BookList = ({ shelfTitle = null, books }) => {

  return (
    <div className="bookshelf">
      {shelfTitle && <h2 className="bookshelf-title">{shelfTitle}</h2>}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map( book => (
            <li key={book.id}>
              <Book book={book}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookList.propTypes = {
  shelfTitle: PropTypes.string,
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired
};

export default BookList;


