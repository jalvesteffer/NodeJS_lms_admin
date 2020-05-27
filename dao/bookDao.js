var db = require('../db');

/* 
This query returns the list of all authors
*/
exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * ' +
      'FROM library.tbl_book',
      function (err, result) {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT ba.bookId, b.title, GROUP_CONCAT(Distinct a.authorName SEPARATOR \', \') AS authors, p.publisherName AS publisher, GROUP_CONCAT( Distinct g.genre_name SEPARATOR \', \') AS genres ' +
      'FROM library.tbl_author a ' +
      'INNER JOIN library.tbl_book_authors ba ON a.authorId = ba.authorId ' +
      'INNER JOIN library.tbl_book b ON b.bookId = ba.bookId ' +
      'INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId ' +
      'INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id ' +
      'INNER JOIN library.tbl_publisher p ON p.publisherId = b.pubId ' +
      'GROUP BY bookId ',
      function (err, result) {
        return err ? reject(err) : resolve(result);
      });
  });
}; */

/* 
This query returns a book by id
*/
exports.getBookById = function (id) {
  return new Promise(function (resolve, reject) {

    db.query('SELECT ba.bookId, b.title, GROUP_CONCAT(Distinct a.authorName SEPARATOR \', \') AS authors, p.publisherName AS publisher, GROUP_CONCAT( Distinct g.genre_name SEPARATOR \', \') AS genres ' +
      'FROM library.tbl_author a ' +
      'INNER JOIN library.tbl_book_authors ba ON a.authorId = ba.authorId ' +
      'INNER JOIN library.tbl_book b ON b.bookId = ba.bookId ' +
      'INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId ' +
      'INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id ' +
      'INNER JOIN library.tbl_publisher p ON p.publisherId = b.pubId ' +
      'WHERE b.bookId = ? ' +
      'GROUP BY bookId ', [id],
      function (err, result) {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns all books by an author id
*/
exports.getBooksByAuthorId = async function (id) {
  return new Promise(function (resolve, reject) {

    db.query('SELECT b.bookId, b.title ' +
      'FROM library.tbl_book b ' +
      'INNER JOIN library.tbl_book_authors ba ON b.bookId = ba.bookId ' +
      'INNER JOIN library.tbl_author a ON a.authorId = ba.authorId WHERE a.authorId=?', [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query returns all books by an author id
*/
exports.getBooksByGenreId = async function (id) {
  return new Promise(function (resolve, reject) {

    db.query('SELECT b.bookId, b.title ' +
      'FROM library.tbl_book b ' +
      'INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId ' +
      'INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id WHERE g.genre_id=?', [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query updates book information
*/
exports.updateBook = function (bookId, title, pubId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_book AS b ' +
      'SET b.title=?, b.pubId=? ' +
      'WHERE b.bookId =? ', [title, pubId, bookId],
      function (err, result) {
        cb(err, result);
      });
  });
};

/* 
This query creates a new book transaction
*/
exports.createBook = async function (book) {
  return new Promise(function (resolve, reject) {
    db.query(
      'INSERT INTO tbl_book (title, pubId) VALUES (?, ?)',
      [book.title, book.pubId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query creates new book/author relationships to populate a books authors list
*/
exports.addBookAuthorRelationship = function (bookArray, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_book_authors (bookId, authorId) ' +
      'VALUES (?, ?)', [bookArray[0], bookArray[1]],
      function (err, result) {
        cb(err, result);
      });
  });
};

/* 
This query removes book/author relationships by author id
*/
exports.removeBookAuthorRelationshipsByAuthorId = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book_authors ' +
      'WHERE authorId=?', [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query removes book/author relationships by author id
*/
exports.removeBookGenreRelationshipsByGenreId = async function (id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book_genres ' +
      'WHERE genre_id=?', [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query creates new book/genre relationships to populate a books genres list
*/
exports.addBookGenreRelationship = function (bookArray, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_book_genres (genre_id, bookId) ' +
      'VALUES (?, ?)', [bookArray[0], bookArray[1]],
      function (err, result) {
        cb(err, result);
      });
  });
};

/* 
This query deletes a specified book by id
*/
exports.deleteBook = function (id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book WHERE bookId=?', [id], function (err, result) {
      cb(err, result);
    });
  });
};

/* 
This query deletes all books by by an author's id
*/
exports.deleteBooksByAuthorId = async function (id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE b FROM tbl_book AS b INNER JOIN tbl_book_authors AS ba ON b.bookId=ba.bookId WHERE ba.authorId=?',
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};