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
import * as Notification from './util/Notification';


class BooksApp extends Component {
  state = {
    /**
     * @state {BookModel[]} All the books in "My shelves"
     */
    myBooks: [],
    /**
     * @state {boolean} Indicates if the getBooks call is being made
     */
    loading: false
  };


  getMyBooks = () => {

  };

  componentDidMount() {
    this.setState(currState => ({ loading: true }));
    BooksAPI.getAll()
      .then(this.onGetBooksSuccess)
      .catch((err) => { console.log("ERROR IN BooksAPI.getAll(): ", err); })
      .then( () => { //Finally
        this.setState(currState => ({ loading: false }));
      })
    ;
  }

  /**
   * @param {Object[]} apiBooks List of books in format returned by BooksAPI
   */
  onGetBooksSuccess = (apiBooks) => {
    this.setState( () => ({
      myBooks: apiBooks.map(apiBook => new BookModel(apiBook))
    }));
  };

  /**
   * Changes a book to a new shelf. Handles both in-memory and backend changes.
   * @param {BookModel} book
   * @param {string} newShelf
   */
  onShelfChange = (book, newShelf) => {
    //Makes the ajax call. If there was an error, rollbacks to previous state.
    //TODO: Consider several simultaneous failures (Reviewer, should I?)
    const persistShelfUpdate = (previousState) => {
      BooksAPI.update(book, newShelf).catch(() => {
        this.setState(previousState);
      });
    };

    Notification.show(`Moved "${book.title}" to ${newShelf} shelf`);

    this.setState((currState) => {
      persistShelfUpdate(currState);
      return this.getStateForShelfChange(book, newShelf, currState);
    });
  };

  /**
   * Gets the new state after shelf change. (Adds the book if not present yet, and updates the new shelf)
   * @param {BookModel} book whose shelf is changing
   * @param {string} newShelf
   * @param {{ myBooks }} currentState
   * @returns {{ myBooks }} new state
   */
  getStateForShelfChange = (book, newShelf, currentState) => {
    const isNewBook = currentState.myBooks.find( b => b.id === book.id ) === undefined;
    const myBooks = currentState.myBooks
      .concat(isNewBook ? [book] : [] ) //If the book isn't in any shelf, we add it
      .map( b => {
        return b.id !== book.id ? b : new BookModel({ ...b, shelf: newShelf }) //Updates the shelf immutably
      })
    ;
    return {
      myBooks: myBooks
    };
  };

  render() {
    const { myBooks, loading } = this.state;
    return (
      <div>
        <Notification.Container />
        <Route exact path={'/'} render={() => (
          <MyLibrary books={myBooks} onShelfChange={this.onShelfChange} loading={loading} />
        )}
        />
        <Route path={'/search'} render={() => (
          <Search myBooks={myBooks} onShelfChange={this.onShelfChange} />
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
