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

exports.updateBranch = function (branch, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_library_branch ' +
      'SET branchName=?, branchAddress=? ' +
      'WHERE branchId=?', [branch.branchName, branch.branchAddress, branch.branchId], function (err, result) {
      cb(err, result);
    });
  });
};