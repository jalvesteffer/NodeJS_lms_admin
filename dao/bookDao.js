var db = require('../db').getDb();

/* 
This query returns the list of all books
*/
exports.getAllBooks = async () => {
  let books = await db.query(
    'SELECT * ' +
    'FROM library.tbl_book ' +
    'ORDER BY title ASC');
  return books;
};

/* 
This query returns the list of all books by search title
*/
exports.getAllBooksLike = async (title) => {
  let retVal = await db.query(
    "SELECT * " +
    "FROM library.tbl_book " +
    "WHERE title LIKE ? " +
    "ORDER BY title ASC", ['%' + title + '%']);
  return retVal;
}

/* 
This query returns the list of all authors for a book id
*/
exports.getAuthorsByBookId = async (id) => {
  let authors = await db.query(
    'SELECT a.authorId, a.authorName ' +
    'FROM tbl_book AS b ' +
    'INNER JOIN tbl_book_authors AS ba ON b.bookId=ba.bookId ' +
    'INNER JOIN tbl_author AS a ON ba.authorId=a.authorId ' +
    'WHERE b.bookId=?', [id]);
  return authors;
};

/* 
This query returns the publisher name for a book id
*/
exports.getPublisherByBookId = async (id) => {
  let publisher = await db.query(
    'SELECT p.publisherId, p.publisherName ' +
    'FROM tbl_book AS b ' +
    'INNER JOIN tbl_publisher AS p ON b.pubId=p.publisherId ' +
    'WHERE b.bookId=?', [id]);
  return publisher;
};

/* 
This query returns the genres for a book id
*/
exports.getGenresByBookId = async (id) => {
  let genres = await db.query(
    'SELECT g.genre_id, g.genre_name ' +
    'FROM tbl_book AS b ' +
    'INNER JOIN tbl_book_genres AS bg ON b.bookId=bg.bookId ' +
    'INNER JOIN tbl_genre AS g ON bg.genre_id=g.genre_id ' +
    'WHERE b.bookId=?', [id]);
  return genres;
};

/* 
This query returns a book by id
*/
exports.getBookById = async (id) => {
  let book = await db.query(
    'SELECT * ' +
    'FROM tbl_book ' +
    'WHERE bookId=?', [id]);
  return book;
};

/* 
This query returns all books by an author id
*/
exports.getBooksByAuthorId = async (id) => {
  let books = await db.query(
    'SELECT b.bookId, b.title ' +
    'FROM library.tbl_book b ' +
    'INNER JOIN library.tbl_book_authors ba ON b.bookId = ba.bookId ' +
    'INNER JOIN library.tbl_author a ON a.authorId = ba.authorId WHERE a.authorId=?', [id]);
  return books;
};

/* 
This query returns all books by an author id
*/
exports.getBooksByGenreId = async (id) => {
  let books = await db.query(
    'SELECT b.bookId, b.title ' +
    'FROM library.tbl_book b ' +
    'INNER JOIN library.tbl_book_genres bg ON b.bookId = bg.bookId ' +
    'INNER JOIN library.tbl_genre g ON g.genre_id = bg.genre_id WHERE g.genre_id=?', [id]);
  return books;
};

/* 
This query updates book information
*/
exports.updateBook = async (bookId, title, pubId) => {
  let retVal = await db.query(
    'UPDATE tbl_book AS b ' +
    'SET b.title=?, b.pubId=? ' +
    'WHERE b.bookId =? ', [title, pubId, bookId]);
  return retVal;
};

/* 
This query creates a new book transaction
*/
exports.createBook = async (book) => {
  let retVal = await db.query(
    'INSERT INTO tbl_book (title, pubId) ' +
    'VALUES (?, ?)', [book.title, book.pubId]);
  return retVal;
};

/* 
This query creates new book/author relationships to populate a books authors list
*/
exports.addBookAuthorRelationship = async (bookArray) => {
  let retVal = await db.query(
    'INSERT INTO tbl_book_authors (bookId, authorId) ' +
    'VALUES (?, ?)', [bookArray[0], bookArray[1]]);
  return retVal;
};

/* 
This query removes book/author relationships by author id
*/
exports.removeBookAuthorRelationshipsByAuthorId = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book_authors ' +
    'WHERE authorId=?', [id]);
  return retVal;
};

/* 
This query removes book/author relationships by book id
*/
exports.removeBookAuthorRelationshipsByBookId = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book_authors ' +
    'WHERE bookId=?', [id]);
  return retVal;
};

/* 
This query removes book/genre relationships by author id
*/
exports.removeBookGenreRelationshipsByGenreId = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book_genres ' +
    'WHERE genre_id=?', [id]);
  return retVal;
};

/* 
This query removes book/genre relationships by book id
*/
exports.removeBookGenreRelationshipsByBookId = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book_genres ' +
    'WHERE bookId=?', [id]);
  return retVal;
};

/* 
This query creates new book/genre relationships to populate a books genres list
*/
exports.addBookGenreRelationship = async (bookArray) => {
  let retVal = await db.query(
    'INSERT INTO tbl_book_genres (genre_id, bookId) ' +
    'VALUES (?, ?)', [bookArray[0], bookArray[1]]);
  return retVal;
};

/* 
This query deletes a specified book by id
*/
exports.deleteBook = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_book ' +
    'WHERE bookId=?', [id]);
  return retVal;
};

/* 
This query deletes all books by by an author's id
*/
exports.deleteBooksByAuthorId = async (id) => {
  let retVal = await db.query(
    'DELETE b ' +
    'FROM tbl_book AS b ' +
    'INNER JOIN tbl_book_authors AS ba ON b.bookId=ba.bookId ' +
    'WHERE ba.authorId=?', [id]);
  return retVal;
};