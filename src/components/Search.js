/**
 * Main component for the Search screen
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import './Search.css';
import BookList from "./BookList";
import BookModel from '../model/Book';
import * as BooksAPI from '../BooksAPI';
import Book from "./Book";
import PropTypes from "prop-types";


class Search extends Component {

  state = {
    /**
     * @state {string}
     */
    query: '',
    /**
     * @state {BookModel[]}
     */
    filteredBooks: [],
    /**
     * Tracks the number of pending search ajax calls. Useful for show loading states
     * @state {Number}
     */
    pendingSearchCalls: 0,

    searching: false
  };

  constructor(props) {
    super(props);
    this.doSearch = debounce(this.doSearch, 2000); //To prevent making ajax calls too frequently.
  }

  /**
   * Returns the merge between the books returned from search (filteredBooks) and the books from 'my shelves' (myBooks)
   * @param {BookModel[]} filteredBooks
   * @param {BookModel[]} myBooks
   * @return {BookModel[]}
   */
  getFinalBookList = (filteredBooks, myBooks) => {
    return filteredBooks.map(filteredBook => {
      let myBook = myBooks.find( myBook => myBook.id === filteredBook.id );
      return myBook ? new BookModel({ ...filteredBook, shelf: myBook.shelf }) : filteredBook;
    });
  };

  /**
   * @param {Object[]} apiFilteredBooks List of books in the format returned by search api
   */
  onSearchSuccess = (apiFilteredBooks) => {
    this.setState(() => ({
      filteredBooks: apiFilteredBooks.map( apiFilteredBook => new BookModel(apiFilteredBook))
    }));
  };

  /**
   * Makes the search api call
   * @param {string} query
   */
  doSearch = (query) => {
    this.setState(currState => ({ pendingSearchCalls: currState.pendingSearchCalls + 1 }));
    BooksAPI.search(query.trim())
      .then( response => {
        const apiFilteredBooks = response.error ? [] : response; //To handle 'Empty query' error
        this.onSearchSuccess(apiFilteredBooks);
      })
      .catch( err => {
        console.log(`Error ${err.toString()}`); //TODO: show as toast
      })
      .then(() => { //finally
        this.setState(currState => ({ pendingSearchCalls: currState.pendingSearchCalls - 1 }));
      })
    ;
  };

  handleSearchTextChange = (event) => {
    const query = event.target.value;
    this.setState(() => ({
      query: query
    }));
    if(query.trim()){
      this.doSearch(query);
    } else {
      this.setState(() => ({
        filteredBooks: []
      }));
    }
  };

  render() {
    const { filteredBooks, query, pendingSearchCalls } = this.state;
    const { onShelfChange, myBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={'/'}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleSearchTextChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <BookList
            books={this.getFinalBookList(filteredBooks, myBooks)}
            onShelfChange={onShelfChange}
            noBooksText={() => (
              query.trim() === '' ? 'Type above to search' :
              pendingSearchCalls > 0 ? 'Searching...' :
              'No books found'
            )}
          />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  myBooks: PropTypes.arrayOf(Book.propTypes.book).isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Search;