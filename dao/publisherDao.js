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

exports.updatePublisher = function (publisher, cb) {
  return new Promise(function (resolve, reject) {
    db.query('UPDATE tbl_publisher ' +
      'SET publisherName=?, publisherAddress=?, publisherPhone=? ' +
      'WHERE publisherId=?', [publisher.publisherName, publisher.publisherAddress, publisher.publisherPhone, publisher.publisherId], function (err, result) {
      cb(err, result);
    });
  });
};