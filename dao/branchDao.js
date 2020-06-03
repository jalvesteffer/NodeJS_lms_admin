var db = require('../db').getDb();

/* 
This query returns the list of all library branches
*/
exports.getAllBranches = async () => {
  let branches = await db.query(
    'SELECT * ' +
    'FROM library.tbl_library_branch ' +
    'ORDER BY branchName');
  return branches;
};

/* 
This query returns the list of all library branches by search name
*/
exports.getAllBranchesLike = async (name) => {
  let retVal = await db.query(
    "SELECT * " +
    "FROM library.tbl_library_branch " +
    "WHERE branchName LIKE ? " +
    "ORDER BY branchName", ['%' + name + '%']);
  return retVal;
}

/* 
This query returns a branch by id
*/
exports.getBranchById = async (id) => {
  let branch = await db.query(
    'SELECT * ' +
    'FROM library.tbl_library_branch ' +
    'WHERE branchId=?', [id]);
  return branch;
};

/* 
This query updates branch information
*/
exports.updateBranch = async (branchName, branchAddress, branchId) => {
  let retVal = await db.query(
    'UPDATE tbl_library_branch ' +
    'SET branchName=?, branchAddress=? ' +
    'WHERE branchId=?', [branchName, branchAddress, branchId]);
  return retVal;
};

/* 
This query creates a new branch
*/
exports.createBranch = async (branchName, branchAddress) => {
  let retVal = await db.query(
    'INSERT INTO tbl_library_branch (branchName, branchAddress) ' +
    'VALUES (?, ?)', [branchName, branchAddress]);
  return retVal;
};

/* 
This query deletes a specified branch by id
*/
exports.deleteBranch = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_library_branch ' +
    'WHERE branchId=?', [id]);
  return retVal;
};