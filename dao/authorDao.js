var db = require('../db');

/* 
This query returns the list of all authors
*/
exports.getAllAuthors = async () => {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_author', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query returns an author by id
*/
exports.getAuthorById = async function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_author WHERE authorId=?', [id],
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
This query updates author information
*/
exports.updateAuthor = async function (authorName, authorId) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE library.tbl_author SET authorName=? WHERE authorId=?', [authorName, authorId],
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
This query creates a new author
*/
exports.createAuthor = async function (authorName) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_author (authorName) VALUES (?)', [authorName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/* 
This query deletes a specified author by id
*/
exports.deleteAuthor = async function (authorId) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_author ' +
      'WHERE authorId=?',
      [authorId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

/* 
This query deletes all books by by an author's id
*/
exports.deleteBooksByAuthorId = async function (id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_book WHERE bookId IN ' +
      '(SELECT bookId FROM tbl_book_authors WHERE authorId=?)',
      [id],
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