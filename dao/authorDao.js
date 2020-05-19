var db = require('../db');

exports.getAllAuthors = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_author', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getAuthorById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_author WHERE authorId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.updateAuthor = function (authorName, authorId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE library.tbl_author SET authorName=? WHERE authorId=?', [authorName, authorId], function (err, result) {
      cb(err, result);
    });
  });
};

exports.createAuthor = function (authorName, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_author (authorName) VALUES (?)', [authorName], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deleteAuthor = function (authorId) {
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
      } 
    );
  });
};

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