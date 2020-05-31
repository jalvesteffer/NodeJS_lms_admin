var db = require('../db');

/* 
This query returns the list of all library branches
*/
exports.getAllBranches = async () => {
  return new Promise(function (resolve, reject) {
    db.query('select * from library.tbl_library_branch', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

/* 
This query returns a branch by id
*/
exports.getBranchById = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_library_branch WHERE branchId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query updates branch information
*/
exports.updateBranch = async (branchName, branchAddress, branchId) => {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_library_branch ' +
      'SET branchName=?, branchAddress=? ' +
      'WHERE branchId=?', [branchName, branchAddress, branchId],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query creates a new branch
*/
exports.createBranch = async (branchName, branchAddress) => {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_library_branch (branchName, branchAddress) ' +
      'VALUES (?, ?)', [branchName, branchAddress],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};

/* 
This query deletes a specified branch by id
*/
exports.deleteBranch = async (id) => {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_library_branch WHERE branchId=?', [id],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      });
  });
};