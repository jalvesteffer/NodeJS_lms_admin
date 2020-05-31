var db = require('../db').getDb();

/* 
This query returns the list of all borrowers
*/
exports.getAllBorrowers = async () => {
  let borrowers = await db.query(
    'SELECT * ' +
    'FROM library.tbl_borrower');
  return borrowers;
};

/* 
This query returns a borrower by id
*/
exports.getBorrowerById = async (cardNo) => {
  let borrower = await db.query(
    'SELECT * ' +
    'FROM library.tbl_borrower ' +
    'WHERE cardNo=?', [cardNo]);
  return borrower;
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