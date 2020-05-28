var db = require('../db');

/* 
This query returns the list of all publishers
*/
exports.getAllPublishers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_publisher', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query returns a publisher by id
*/
exports.getPublisherById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_publisher WHERE publisherId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

/* 
This query updates publisher information
*/
exports.updatePublisher = async function (publisherName, publisherAddress, publisherPhone, publisherId) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_publisher ' +
      'SET publisherName=?, publisherAddress=?, publisherPhone=? ' +
      'WHERE publisherId=?', [publisherName, publisherAddress, publisherPhone, publisherId],
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};

/* 
This query creates a new publisher
*/
exports.createPublisher = async function (publisherName, publisherAddress, publisherPhone) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_publisher (publisherName, publisherAddress, publisherPhone) ' +
      'VALUES (?, ?, ?)', [publisherName, publisherAddress, publisherPhone],
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};

/* 
This query deletes a specified publisher by id
*/
exports.deletePublisher = async function (id) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_publisher WHERE PublisherId=?', [id],
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};