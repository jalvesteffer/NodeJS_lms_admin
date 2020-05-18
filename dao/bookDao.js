var db = require('../db');

exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_book', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getBookById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT tb.bookId AS bookId, tb.title AS title, tp.publisherName AS publisher ' +
      'FROM tbl_book AS tb ' +
      'INNER JOIN tbl_publisher AS tp ON tb.pubId = tp.publisherId ' +
      'WHERE tb.bookId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};