var db = require('../db');

/* 
This query returns the list of all borrowers
*/
exports.getAllBorrowers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query returns a borrower by id
*/
exports.getBorrowerById = function (cardNo) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower WHERE cardNo=?', [cardNo], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query updates borrower information
*/
exports.updateBorrower = function (name, address, phone, cardNo, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_borrower ' +
      'SET name=?, address=?, phone=? ' +
      'WHERE cardNo=?', [name, address, phone, cardNo],
      function (err, result) {
        cb(err, result);
      });
  });
};

/* 
This query creates a new borrower
*/
exports.createBorrower = function (name, address, phone, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_borrower (name, address, phone) VALUES (?, ?, ?)', [name, address, phone], function (err, result) {
      cb(err, result);
    });
  });
};

/* 
This query deletes a specified borrower by id
*/
exports.deleteBorrower = function (cardNo, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_borrower WHERE cardNo=?', [cardNo], function (err, result) {
      cb(err, result);
    });
  });
};