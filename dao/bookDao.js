var db = require('../db');

exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT ba.bookId, b.title, GROUP_CONCAT(Distinct a.authorName SEPARATOR \', \') AS authors, p.publisherName AS publisher, GROUP_CONCAT( Distinct g.genre_name SEPARATOR \', \') AS genres ' +
      'FROM library.tbl_author a ' +
      'INNER JOIN library.tbl_book_authors ba ON a.authorId = ba.authorId ' +
      'INNER JOIN library.tbl_book b ON b.bookId = ba.bookId ' +
      'INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId ' +
      'INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id ' +
      'INNER JOIN library.tbl_publisher p ON p.publisherId = b.pubId ' +
      'GROUP BY bookId ', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

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
      'GROUP BY bookId ', [id], function (err, result) {

      return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateBook = function (book, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_book AS b ' +
      'SET b.title=?, b.pubId=? ' +
      'WHERE b.bookId =? ', [book.title, book.pubId, book. bookId], function (err, result) {
      cb(err, result);
    });
  });
};

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

exports.addBookAuthorRelationship = function (bookArray, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_book_authors (bookId, authorId) ' +
      'VALUES (?, ?)', [bookArray[0], bookArray[1]], function (err, result) {
      cb(err, result);
    });
  });
};

exports.addBookGenreRelationship = function (bookArray, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_book_genres (genre_id, bookId) ' +
      'VALUES (?, ?)', [bookArray[0], bookArray[1]], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deleteBook = function (id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book WHERE bookId=?', [id], function (err, result) {
      cb(err, result);
    });
  });
};