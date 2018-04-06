/**
 * Main Books Application file
 * @author evillegas (edgarinvillegas@hotmail.com)
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import BookModel from './model/Book';
import MyLibrary from './components/MyLibrary';
import Search from './components/Search';

//TODO: Move to utility module
const cloneArray = (array) => {
  return JSON.parse(JSON.stringify(array));
};

class BooksApp extends Component {
  state = {
    myBooks: []
  };

  onShelfChange = (book, newShelf) => {
    console.log('onShelfChange', book, newShelf);
    //Makes the ajax call. If there was an error, rollbacks to previous state. TODO: Consider simultaneous failure
    const persistUpdate = (previousState) => {
      BooksAPI.update(book, newShelf).catch(() => {
        this.setState(previousState);
      });
    };
    this.setState((currState) => {
      const newBooks = cloneArray(currState.myBooks);
      const newBook = newBooks.find( b => b.id === book.id );
      newBook && (newBook.shelf = newShelf);
      persistUpdate(currState);
      return {
        myBooks: newBooks
      };
    });
  };


  onGetBooksSuccess = (apiBooks) => {
    this.setState( () => ({
      myBooks: apiBooks.map(apiBook => new BookModel(apiBook))
    }));
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(this.onGetBooksSuccess)
      .catch((err) => { console.log("ERROR IN BooksAPI.getAll(): ", err); } )
    ;
  }

  render() {
    return (
      <div>
        <Route exact path={'/'} render={() => (
          <MyLibrary books={this.state.myBooks} onShelfChange={this.onShelfChange} />
        )}
        />
        <Route path={'/search'} render={() => (
          <Search myBooks={this.state.myBooks} onShelfChange={this.onShelfChange} />
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
