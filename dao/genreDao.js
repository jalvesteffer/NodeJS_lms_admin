var db = require('../db');

/* 
This query returns the list of all genres
*/
exports.getAllGenres = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_genre', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query returns a genre by id
*/
exports.getGenreById = function (genre_id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_genre WHERE genre_id=?', [genre_id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query updates genre information
*/
exports.updateGenre = function (genre_name, genre_id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_genre ' +
      'SET genre_name=? ' +
      'WHERE genre_id=?', [genre_name, genre_id],
      function (err, result) {
        cb(err, result);
      });
  });
};

exports.createGenre = function (genre_name, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_genre (genre_name) VALUES (?)', [genre_name], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deleteGenre = function (genre_id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_genre WHERE genre_id=?', [genre_id], function (err, result) {
      cb(err, result);
    });
  });
};