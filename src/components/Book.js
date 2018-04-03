import React from 'react';
import PropTypes from 'prop-types';

import './Book.css';

const Book = ({ book, onShelfChange }) => {

  const { title, authors = [], imageLinks: { smallThumbnail } = {}, shelf = 'none' } = book;
  const backgroundImage = `url(${encodeURI(smallThumbnail)})`;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: backgroundImage }} />
        <div className="book-shelf-changer">
          <select value={shelf} onChange={onShelfChange}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string.isRequired
    }),
    shelf: PropTypes.string
  }),
  onShelfChange: PropTypes.func //TODO: analyze if it's required
};

export default Book;