import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';
import Book from './Book';
import './MyLibrary.css';


const MyLibrary = ({ books, onShelfChange }) => {

  const currentlyReadingBooks = books.filter( book => book.shelf === 'currentlyReading' );
  const wantToReadBooks = books.filter( book => book.shelf === 'wantToRead' );
  const readBooks = books.filter( book => book.shelf === 'read' );

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookList key={'currentlyReading'} books={currentlyReadingBooks} shelfTitle={'Currently Reading'} onShelfChange={onShelfChange} />
          <BookList key={'wantToRead'} books={wantToReadBooks} shelfTitle={'Want to read'} onShelfChange={onShelfChange} />
          <BookList key={'read'} books={readBooks} shelfTitle={'Read'} onShelfChange={onShelfChange} />
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  );
};

MyLibrary.propTypes = {
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired
};

export default MyLibrary;
