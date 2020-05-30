var db = require('../db');

/* 
This query returns the list of all borrowers
*/
exports.getAllBorrowers = async () => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower',
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns a borrower by id
*/
exports.getBorrowerById = async (cardNo) => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_borrower WHERE cardNo=?', [cardNo],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query updates borrower information
*/
exports.updateBorrower = async (name, address, phone, cardNo) => {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_borrower ' +
      'SET name=?, address=?, phone=? ' +
      'WHERE cardNo=?', [name, address, phone, cardNo],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query creates a new borrower
*/
exports.createBorrower = async (name, address, phone) => {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_borrower (name, address, phone) VALUES (?, ?, ?)', [name, address, phone],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query deletes a specified borrower by id
*/
exports.deleteBorrower = async (cardNo) => {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_borrower WHERE cardNo=?', [cardNo],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};