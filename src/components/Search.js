import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Search.css';
import BookList from "./BookList";
import BookModel from '../model/Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {

  state = {
    query: '',
    filteredBooks: []
  };

  getFinalBookList = (filteredBooks, myBooks) => {
    return filteredBooks.map(filteredBook => {
      let myBook = myBooks.find( myBook => myBook.id === filteredBook.id );
      return myBook ? new BookModel({ ...filteredBook, shelf: myBook.shelf }) : filteredBook;
    });
  };

  onSearchSuccess = (apiFilteredBooks) => {
    this.setState(() => ({
      filteredBooks: apiFilteredBooks.map( apiFilteredBook => new BookModel(apiFilteredBook))
    }));
  };

  doSearch = (query) => {
    console.log(`Searching with ${query.trim()}`);
    BooksAPI.search(query.trim())
      .then( response => {
        const apiFilteredBooks = response.error ? [] : response;
        this.onSearchSuccess(apiFilteredBooks);
      })
      .catch( err => {
        console.log(`Error ${err.toString()}`);
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
    const { filteredBooks, query } = this.state;
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
          <BookList books={this.getFinalBookList(filteredBooks, myBooks)} onShelfChange={onShelfChange}/>
        </div>
      </div>
    )
  }
}

export default Search;