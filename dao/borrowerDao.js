var db = require('../db');

exports.getAllBorrowers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};