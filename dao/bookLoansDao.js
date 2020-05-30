var db = require('../db');

/* 
This query gets all books that are overdue
*/
exports.getOverdueBookLoans = async () => {
  return new Promise(function (resolve, reject) {
    db.query(
      'SELECT * ' +
      'FROM tbl_book_Loans ' +
      'WHERE dueDate < CURRENT_TIMESTAMP()',
      [],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query extends an overdue book by 7 days
*/
exports.extendOverdueBookLoan = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query(
      'UPDATE tbl_book_loans ' +
      'SET dueDate=DATE_ADD(dueDate, INTERVAL 7 DAY) ' +
      'WHERE loanId=?',
      [id],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query returns a book loan by id
*/
exports.findBookLoansById = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query(
      'SELECT * FROM tbl_book_Loans WHERE loanId=?',
      [id],
      (err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};