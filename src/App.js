/**
 * Main Books Application file
 * @author evillegas (edgarinvillegas@hotmail.com)
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TransitionSwitch from 'react-router-transition-switch';
import Fader from 'react-fader';

import * as BooksAPI from './BooksAPI';
import BookModel from './model/Book';
import MyLibrary from './components/MyLibrary';
import Search from './components/Search';
import { notify, NotificationContainer} from './util/notification';
import Shelf from "./model/Shelf";

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

  componentDidMount() {
    this.setState(() => ({ loading: true }));
    BooksAPI.getAll()
      .then(this.onGetBooksSuccess)
      .catch((err) => { alert(`Error when fetching my books. Please refresh the page. \nError: ${err.message}`); })
      .then( () => { //Finally
        this.setState(() => ({ loading: false }));
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
        notify(`Could not move "${book.title}" to "${Shelf.getLabel(newShelf)}" shelf`);
      });
    };

    notify(`Moved "${book.title}" to "${Shelf.getLabel(newShelf)}" shelf`);

    let previousState;
    this.setState(currState => {
      previousState = currState;
      return this.getStateForShelfChange(book, newShelf, currState);
    }, () => persistShelfUpdate(previousState));
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
        <NotificationContainer />
        <TransitionSwitch component={Fader}>
          <Route exact path={'/'} render={() => (
            <MyLibrary books={myBooks} onShelfChange={this.onShelfChange} loading={loading} />
          )}
          />
          <Route path={'/search'} render={() => (
            <Search myBooks={myBooks} onShelfChange={this.onShelfChange}  />
          )}
          />
        </TransitionSwitch>
      </div>
    );
  }
}

export default BooksApp;
