import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Book.css';

class Book extends Component {
  bookEl = null; //Reference only for animation

  componentDidUpdate() {
    console.log(`componentDidUpdate ${this.props.book.title}`);
    const bookEl = this.bookEl;
    bookEl.classList.remove('fade-out-in');
    setTimeout( () => bookEl && bookEl.classList.add('fade-out-in'), 100);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const book = this.props.book;
    const newBook = nextProps.book;
    return book.id !== newBook.id || book.shelf !== newBook.shelf;
  }

  render() {
    const {book, onShelfChange} = this.props;
    const { title, authors = [], thumbnailUrl = '', shelf = 'none' } = book;
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