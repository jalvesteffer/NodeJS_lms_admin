var db = require('../db');

exports.getAllGenres = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_genre', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getGenreById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_genre WHERE genre_id=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.updateGenre = function (genre, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_genre ' +
      'SET genre_name=? ' +
      'WHERE genre_id=?', [genre.genre_name, genre.genre_id], function (err, result) {
      cb(err, result);
    });
  });
};

exports.createGenre = function (genre, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_genre (genre_name) VALUES (?)', [genre.genre_name], function (err, result) {
      cb(err, result);
    });
  });
};