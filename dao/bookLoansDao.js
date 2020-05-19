var db = require('../db');

exports.findBookLoansById = async function (key) {
  return new Promise(function (resolve, reject) {
    db.query(
      'SELECT * FROM tbl_book_Loans WHERE bookId=? AND branchId=? AND cardNo=? AND dateOut=?',
      [key.bookId, key.branchId, key.cardNo, key.dateOut],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.saveBookLoansById = async function (key) {
  return new Promise(function (resolve, reject) {
    db.query(
      'UPDATE tbl_book_loans SET dueDate=? WHERE bookId=? AND branchId=? AND cardNo=? AND dateOut=?',
      [key.dueDate, key.bookId, key.branchId, key.cardNo, key.dateOut],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}; 