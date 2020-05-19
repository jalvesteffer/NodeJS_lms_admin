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

exports.updateBorrower = function (name, address, phone, cardNo, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_borrower ' +
      'SET name=?, address=?, phone=? ' +
      'WHERE cardNo=?', [name, address, phone, cardNo], function (err, result) {
      cb(err, result);
    });
  });
};

exports.createBorrower = function (name, address, phone, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_borrower (name, address, phone) VALUES (?, ?, ?)', [name, address, phone], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deleteBorrower = function (id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_borrower WHERE cardNo=?', [id], function (err, result) {
      cb(err, result);
    });
  });
}; 