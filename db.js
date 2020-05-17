var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'replace_with_my_password 3',
    database : 'library'
});

module.exports = connection;