var db = require('../db');

exports.getAllBranches = function () {
  return new Promise(function (resolve, reject) {
    db.query('select * from library.tbl_library_branch', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.getBranchById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_library_branch WHERE branchId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateBranch = function (branchName, branchAddress, branchId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_library_branch ' +
      'SET branchName=?, branchAddress=? ' +
      'WHERE branchId=?', [branchName, branchAddress, branchId], function (err, result) {
      cb(err, result);
    });
  });
};

exports.createBranch = function (branchName, branchAddress, branchId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_library_branch (branchName, branchAddress) ' +
      'VALUES (?, ?)', [branchName, branchAddress, branchId], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deleteBranch = function (id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_library_branch WHERE branchId=?', [id], function (err, result) {
      cb(err, result);
    });
  });
}; 