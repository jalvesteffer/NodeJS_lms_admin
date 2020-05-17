var db = require('../db');

exports.getAllPublishers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_publisher', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};