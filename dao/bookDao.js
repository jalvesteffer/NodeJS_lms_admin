var db = require('../db');

exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT ba.bookId, b.title, GROUP_CONCAT(Distinct a.authorName) AS authors, GROUP_CONCAT( Distinct g.genre_name) AS genres FROM library.tbl_author a INNER JOIN library.tbl_book_authors ba ON a.authorId = ba.authorId INNER JOIN library.tbl_book b ON b.bookId = ba.bookId INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id GROUP BY bookId ', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getBookById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT ba.bookId, b.title, GROUP_CONCAT(Distinct a.authorName) AS authors, GROUP_CONCAT( Distinct g.genre_name) AS genres FROM library.tbl_author a INNER JOIN library.tbl_book_authors ba ON a.authorId = ba.authorId INNER JOIN library.tbl_book b ON b.bookId = ba.bookId INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id WHERE b.bookId = ? GROUP BY bookId ', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};