/**
 * BookList component
 * This renders a list of books with an optional title
 * It can be used for shelves or search.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Book from './Book'; //Importing this just for its propTypes
import './BookList.css';

const BookList = ({ shelfTitle: title = null, books, onShelfChange, noBooksText = () => 'No books' }) => {

  const renderBody = () => {
    return (
      <div className="bookshelf-books">
        {books.length === 0 && <div className="bookshelf-no-books"> {noBooksText()} </div>}
        {books.length > 0 && (
          <TransitionGroup className="books-grid" component={'ol'}>
            {books.map( book => (
              <CSSTransition
                key={book.id}
                timeout={500}
                classNames="fade"
              >
                <li>
                  <Book book={book} onShelfChange={onShelfChange}/>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
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
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
  onShelfChange: PropTypes.func.isRequired,
  noBooksText: PropTypes.func
};

export default BookList;


