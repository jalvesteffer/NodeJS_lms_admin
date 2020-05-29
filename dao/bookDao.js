var db = require('../db');

/* 
This query returns the list of all authors
*/
exports.getAllBooks = async () => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * ' +
      'FROM library.tbl_book',
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns the list of all authors for a book id
*/
exports.getAuthorsByBookId = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT a.authorId, a.authorName ' +
      'FROM tbl_book AS b ' +
      'INNER JOIN tbl_book_authors AS ba ON b.bookId=ba.bookId ' +
      'INNER JOIN tbl_author AS a ON ba.authorId=a.authorId ' +
      'WHERE b.bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns the publisher name for a book id
*/
exports.getPublisherByBookId = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT p.publisherId, p.publisherName ' +
      'FROM tbl_book AS b ' +
      'INNER JOIN tbl_publisher AS p ON b.pubId=p.publisherId ' +
      'WHERE b.bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns the genres for a book id
*/
exports.getGenresByBookId = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT g.genre_id, g.genre_name ' +
      'FROM tbl_book AS b ' +
      'INNER JOIN tbl_book_genres AS bg ON b.bookId=bg.bookId ' +
      'INNER JOIN tbl_genre AS g ON bg.genre_id=g.genre_id ' +
      'WHERE b.bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns a book by id
*/
exports.getBookById = async (id) => {
  return new Promise(function (resolve, reject) {

    db.query('SELECT * ' +
      'FROM tbl_book ' +
      'WHERE bookId=?', [id],
      (err, result) => {
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
exports.updateBook = async (bookId, title, pubId) => {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_book AS b ' +
      'SET b.title=?, b.pubId=? ' +
      'WHERE b.bookId =? ', [title, pubId, bookId],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query creates a new book transaction
*/
exports.createBook = async (book) => {
  return new Promise(function (resolve, reject) {
    db.query(
      'INSERT INTO tbl_book (title, pubId) VALUES (?, ?)',
      [book.title, book.pubId],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
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
This query removes book/author relationships by book id
*/
exports.removeBookAuthorRelationshipsByBookId = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book_authors ' +
      'WHERE bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query removes book/genre relationships by author id
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
This query removes book/genre relationships by book id
*/
exports.removeBookGenreRelationshipsByBookId = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book_genres ' +
      'WHERE bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
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
exports.deleteBook = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book WHERE bookId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
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