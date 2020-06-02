var db = require('../db').getDb();

/* 
This query returns the list of all publishers
*/
exports.getAllPublishers = async () => {
  let retVal = await db.query(
    'SELECT * ' +
    'FROM library.tbl_publisher');
  return retVal;
};

/* 
This query returns the list of all publishers by search name
*/
exports.getAllPublishersLike = async (name) => {
  let retVal = await db.query(
    "SELECT * " +
    "FROM library.tbl_publisher " +
    "WHERE publisherName LIKE ?", ['%' + name + '%']);
  return retVal;
}

/* 
This query returns a publisher by id
*/
exports.getPublisherById = async (id) => {
  let publisher = await db.query(
    'SELECT * ' +
    'FROM library.tbl_publisher ' +
    'WHERE publisherId=?', [id]);
  return publisher;
};

/* 
This query updates publisher information
*/
exports.updatePublisher = async (publisherName, publisherAddress, publisherPhone, publisherId) => {
  let retVal = await db.query(
    'UPDATE tbl_publisher ' +
    'SET publisherName=?, publisherAddress=?, publisherPhone=? ' +
    'WHERE publisherId=?', [publisherName, publisherAddress, publisherPhone, publisherId]);
  return retVal;
};

/* 
This query creates a new publisher
*/
exports.createPublisher = async (publisherName, publisherAddress, publisherPhone) => {
  let retVal = await db.query(
    'INSERT INTO tbl_publisher (publisherName, publisherAddress, publisherPhone) ' +
    'VALUES (?, ?, ?)', [publisherName, publisherAddress, publisherPhone]);
  return retVal;
};

/* 
This query deletes a specified publisher by id
*/
exports.deletePublisher = async (id) => {
  let retVal = await db.query(
    'DELETE FROM tbl_publisher ' +
    'WHERE PublisherId=?', [id]);
  return retVal;
};