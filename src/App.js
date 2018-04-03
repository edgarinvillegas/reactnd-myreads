/**
 * Main Books Application file
 * @author evillegas (edgarinvillegas@hotmail.com)
 */
import React from 'react';

import MyLibrary from './components/MyLibrary';
import * as BooksAPI from './BooksAPI';

const BooksApp = () => {
  //console.log(BooksAPI.getAll().then((response) => console.log(JSON.stringify(response))));
  return (
    <MyLibrary />
  );
};

export default BooksApp;
