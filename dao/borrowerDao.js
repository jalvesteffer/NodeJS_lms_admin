var db = require('../db');

exports.getAllBorrowers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getBorrowerById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower WHERE cardNo=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};