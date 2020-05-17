var db = require('../db');

exports.getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_book', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};