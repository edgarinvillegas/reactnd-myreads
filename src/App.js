/**
 * Main Books Application file
 * @author evillegas (edgarinvillegas@hotmail.com)
 */
import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI';
import BookModel from './model/Book';
import MyLibrary from './components/MyLibrary';

//TODO: Move to utility module
const cloneArray = (array) => {
  return JSON.parse(JSON.stringify(array));
};

class BooksApp extends Component {
  state = {
    books: []
  };

  onShelfChange = (book, newShelf) => {
    this.setState((currState) => {
      const newBooks = cloneArray(currState.books);
      const newBook = newBooks.find( b => b.id === book.id );
      newBook && (newBook.shelf = newShelf);
      return {
        books: newBooks
      };
    });
  };


  onGetBooksSuccess = (apiBooks) => {
    this.setState( () => ({
      books: apiBooks.map( apiBook => new BookModel(apiBook))
    }));
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(this.onGetBooksSuccess)
    ;
  }

  render() {
    return (
      <MyLibrary books={this.state.books} onShelfChange={this.onShelfChange} />
    );
  }
}

export default BooksApp;
