var db = require('../db').getDb();

/* 
This query returns the list of all authors
*/
exports.getAllAuthors = async () => {
  let authors = await db.query(
    'SELECT * ' +
    'FROM library.tbl_author');
  return authors;
};

/* 
This query returns the list of all authors by search name
*/
exports.getAllAuthorsLike = async (name) => {
  let retVal = await db.query(
    "SELECT * " +
    "FROM library.tbl_author " +
    "WHERE authorName LIKE ?", ['%' + name + '%']);
  return retVal;
}

/* 
This query returns an author by id
*/
exports.getAuthorById = async (id) => {
  let author = await db.query(
    'SELECT * ' +
    'FROM library.tbl_author ' +
    'WHERE authorId=?', [id]);
  return author;
};

/* 
This query updates author information
*/
exports.updateAuthor = async (authorName, authorId) => {
  let update = db.query(
    'UPDATE library.tbl_author ' +
    'SET authorName=? ' +
    'WHERE authorId=?', [authorName, authorId]);
  return update;
};

/* 
This query creates a new author
*/
exports.createAuthor = async (authorName) => {
  let retVal = await db.query(
    'INSERT INTO tbl_author (authorName) ' +
    'VALUES (?)', [authorName]);
  return retVal;
};

/* 
This query deletes a specified author by id
*/
exports.deleteAuthor = async (authorId) => {
  let retVal = await db.query(
    'DELETE FROM tbl_author ' +
    'WHERE authorId=?', [authorId]);
  return retVal;
};

/* 
This query deletes all books by by an author's id
*/
exports.deleteBooksByAuthorId = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book ' +
    'WHERE bookId IN ' +

    '(SELECT bookId ' +
    'FROM tbl_book_authors ' +
    'WHERE authorId=?)', [id]);
  return retVal;
};