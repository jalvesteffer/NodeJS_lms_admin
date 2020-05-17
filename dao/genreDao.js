var db = require('../db');

exports.getAllGenres = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_genre', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};