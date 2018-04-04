/**
 * BookList component
 * This renders a list of books with an optional title
 * It can be used for shelves or search.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book'; //Importing this just because of its propTypes
import './BookList.css';

const BookList = ({ shelfTitle: title = null, books, onShelfChange }) => {

  return (
    <div className="bookshelf">
      {title && <h2 className="bookshelf-title">{title}</h2>}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map( book => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange}/>
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


