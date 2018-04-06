/**
 * POJO that represents a Book
 * It's a subset of what we receive from BooksAPI, with only the fields we need.
 * Usage:
 * const apiBook = {
    "title": "The Linux Command Line",
    "authors": [
      "William E. Shotts, Jr."
    ],
    "publisher": "No Starch Press",
    "publishedDate": "2012",
    "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "id": "nggnmAEACAAJ",
    "shelf": "currentlyReading"
    ...
  }
  const book = new Book(apiBook);
 */

class Book {
  id = '';
  title = '';
  authors = [];
  thumbnailUrl = '';
  shelf = '';

  constructor(book) {
    if (book.imageLinks) {
      this._constructFromApiBook(book);
    } else {
      this._constructFromBookLike(book);
    }
  }

  _constructFromApiBook(apiBook) {
    Object.assign(this, {
      id: apiBook.id,
      title: apiBook.title,
      authors: apiBook.authors,
      thumbnailUrl: apiBook.imageLinks ? apiBook.imageLinks.smallThumbnail : '',
      shelf: apiBook.shelf || 'none'
    });
  }

  _constructFromBookLike(book) {
    Object.assign(this, book);
  }

}

export default Book;