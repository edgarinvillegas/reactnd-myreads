/**
 * MyLibary component. Corresponds to the shelves page
 */
import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';
import Book from './Book'; //Importing this just for its propTypes
import './MyLibrary.css';
import {Link} from "react-router-dom";
import Shelf, { ShelfEnum } from "../model/Shelf";


const MyLibrary = ({ books, onShelfChange, loading = false }) => {

  const currentlyReadingBooks = books.filter( book => book.shelf === 'currentlyReading' );
  const wantToReadBooks = books.filter( book => book.shelf === 'wantToRead' );
  const readBooks = books.filter( book => book.shelf === 'read' );
  const noBooksText = loading ? 'Loading...' : 'No books in this shelf'

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookList
            key={ShelfEnum.CURRENTLY_READING}
            books={currentlyReadingBooks}
            shelfTitle={Shelf.getLabel(ShelfEnum.CURRENTLY_READING)}
            onShelfChange={onShelfChange}
            noBooksText={noBooksText}
          />
          <BookList
            key={ShelfEnum.WANT_TO_READ}
            books={wantToReadBooks}
            shelfTitle={Shelf.getLabel(ShelfEnum.WANT_TO_READ)}
            onShelfChange={onShelfChange}
            noBooksText={noBooksText}
          />
          <BookList
            key={ShelfEnum.READ}
            books={readBooks}
            shelfTitle={Shelf.getLabel(ShelfEnum.READ)}
            onShelfChange={onShelfChange}
            noBooksText={noBooksText}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to={'/search'}>Add a book</Link>
      </div>
    </div>
  );
};

MyLibrary.propTypes = {
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
  onShelfChange: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default MyLibrary;
