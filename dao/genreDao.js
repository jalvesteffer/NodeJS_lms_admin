var db = require('../db').getDb();

/* 
This query returns the list of all genres
*/
exports.getAllGenres = async () => {
  let genres = await db.query(
    'SELECT * ' +
    'FROM library.tbl_genre');
  return genres;
};

/* 
This query returns a genre by id
*/
exports.getGenreById = async (genre_id) => {
  let genre = await db.query(
    'SELECT * ' +
    'FROM library.tbl_genre ' +
    'WHERE genre_id=?', [genre_id]);
  return genre;
};

/* 
This query updates genre information
*/
exports.updateGenre = async function (genre_name, genre_id) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_genre ' +
      'SET genre_name=? ' +
      'WHERE genre_id=?', [genre_name, genre_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query updates borrower information
*/
exports.createGenre = async function (genre_name) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_genre (genre_name) VALUES (?)', [genre_name],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/* 
This query deletes a specified genre by id
*/
exports.deleteGenre = async function (genre_id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_genre WHERE genre_id=?', [genre_id],
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};