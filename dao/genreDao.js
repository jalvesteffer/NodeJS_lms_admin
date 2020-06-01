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
exports.updateGenre = async (genre_name, genre_id) => {
  let retVal = await db.query(
    'UPDATE tbl_genre ' +
    'SET genre_name=? ' +
    'WHERE genre_id=?', [genre_name, genre_id]);
  return retVal;
};

/* 
This query updates borrower information
*/
exports.createGenre = async (genre_name) => {
  let retVal = await db.query(
    'INSERT INTO tbl_genre (genre_name) ' +
    'VALUES (?)', [genre_name]);
  return retVal;
};

/* 
This query deletes a specified genre by id
*/
exports.deleteGenre = async (genre_id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_genre ' +
    'WHERE genre_id=?', [genre_id]);
  return retVal;
};