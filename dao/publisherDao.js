var db = require('../db');

exports.getAllPublishers = function () {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_publisher', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getPublisherById = function (id) {
  return new Promise(function (resolve, reject) {
    db.query('SELECT * FROM library.tbl_publisher WHERE publisherId=?', [id], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.updatePublisher = function (publisherName, publisherAddress, publisherPhone, publisherId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_publisher ' +
      'SET publisherName=?, publisherAddress=?, publisherPhone=? ' +
      'WHERE publisherId=?', [publisherName, publisherAddress, publisherPhone, publisherId], function (err, result) {
      cb(err, result);
    });
  });
};

exports.createPublisher = function (publisherName, publisherAddress, publisherPhone, publisherId, cb) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT INTO tbl_publisher (publisherName, publisherAddress, publisherPhone) ' +
      'VALUES (?, ?, ?)', [publisherName, publisherAddress, publisherPhone, publisherId], function (err, result) {
      cb(err, result);
    });
  });
};

exports.deletePublisher = function (id, cb) {
  return new Promise(function (resolve, reject) {
    db.query('DELETE FROM tbl_publisher WHERE PublisherId=?', [id], function (err, result) {
      cb(err, result);
    });
  });
}; 

