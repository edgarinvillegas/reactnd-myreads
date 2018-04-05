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

  const renderBody = () => {
    return (
      <div className="bookshelf-books">
        {books.length === 0 && <div className="bookshelf-no-books"> No books </div>}
        {books.length > 0 && (
          <ol className="books-grid">
            {books.map( book => (
              <li key={book.id}>
                <Book book={book} onShelfChange={onShelfChange}/>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  };


  return (
    <div className="bookshelf">
      {title && <h2 className="bookshelf-title">{`${title} (${books.length})`}</h2>}
      {renderBody()}
    </div>
  );
};

BookList.propTypes = {
  shelfTitle: PropTypes.string,
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired
};

export default BookList;


