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
This query returns the list of all borrowers by search name
*/
exports.getAllBorrowersLike = async (name) => {
  let retVal = await db.query(
    "SELECT * " +
    "FROM library.tbl_borrower " +
    "WHERE name LIKE ?", ['%' + name + '%']);
  return retVal;
}

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
  let retVal = await db.query(
    'UPDATE tbl_borrower ' +
    'SET name=?, address=?, phone=? ' +
    'WHERE cardNo=?', [name, address, phone, cardNo]);
  return retVal;
};

/* 
This query creates a new borrower
*/
exports.createBorrower = async (name, address, phone) => {
  let retVal = await db.query(
    'INSERT INTO tbl_borrower (name, address, phone) ' +
    'VALUES (?, ?, ?)', [name, address, phone]);
  return retVal;
};

/* 
This query deletes a specified borrower by id
*/
exports.deleteBorrower = async (cardNo) => {
  let retVal = await db.query(
    'DELETE FROM tbl_borrower ' +
    'WHERE cardNo=?', [cardNo]);
  return retVal;
};