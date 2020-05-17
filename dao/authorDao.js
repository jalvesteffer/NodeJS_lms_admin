var db = require('../db');

exports.getAllAuthors = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_author', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getAuthorById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM tbl_author WHERE authorId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};