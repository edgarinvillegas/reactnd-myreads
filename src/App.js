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



class BooksApp extends Component {
  state = {
    myBooks: []
  };

  onShelfChange = (book, newShelf) => {
    //Makes the ajax call. If there was an error, rollbacks to previous state. TODO: Consider simultaneous failure
    const persistShelfUpdate = (previousState) => {
      BooksAPI.update(book, newShelf).catch(() => {
        this.setState(previousState);
      });
    };
    this.setState((currState) => {
      persistShelfUpdate(currState);
      return {
        myBooks: currState.myBooks.map( b => {
          return b.id !== book.id ? b : new BookModel({ ...b, shelf: newShelf })
        })
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
