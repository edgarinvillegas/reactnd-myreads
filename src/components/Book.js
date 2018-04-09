import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Book.css';
import { ShelfEnum } from "../model/Shelf";

class Book extends Component {
  bookEl = null; //Reference only for animation

  componentDidUpdate() {
    //When a book is updated, adds a fade-out + fade-in animation
    const bookEl = this.bookEl;
    bookEl.classList.remove('fade-out-in');
    requestAnimationFrame(() => bookEl && bookEl.classList.add('fade-out-in'));
  }

  shouldComponentUpdate(nextProps) {
    const book = this.props.book;
    const newBook = nextProps.book;
    return !book.equals(newBook);
  }

  render() {
    const {book, onShelfChange} = this.props;
    const { title, authors = [], thumbnailUrl = '', shelf = ShelfEnum.NONE } = book;
    const backgroundImage = `url(${encodeURI(thumbnailUrl)})`;
    const handleShelfSelect = (event) => {
      const newShelf = event.target.value;
      onShelfChange(book, newShelf);
    };

    return (
      <div className="book" ref={el => this.bookEl = el}>
        <div className="book-top">
          <div className="book-cover" style={{width: 128, height: 193, backgroundImage: backgroundImage}}/>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={handleShelfSelect}>
              <option value={ShelfEnum.NONE} disabled>Move to...</option>
              <option value={ShelfEnum.CURRENTLY_READING}>Currently Reading</option>
              <option value={ShelfEnum.WANT_TO_READ}>Want to Read</option>
              <option value={ShelfEnum.READ}>Read</option>
              <option value={ShelfEnum.NONE}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  //book is a Book Model object.
  book: PropTypes.shape({
    /*
     id is not used in this component, but given we reuse this propType outside, we're making it required.
     I didn't find a cleaner way to do this applying DRY.
     */
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    thumbnailUrl: PropTypes.string,
    shelf: PropTypes.string
  }),
  onShelfChange: PropTypes.func.isRequired
};

export default Book;