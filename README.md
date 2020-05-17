# NodeJS_lms_admin
# Add your own DB connection file named db.js:

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'replace_with_my_password',
    database : 'library'
});

module.exports = connection;
