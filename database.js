var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'con',
    database: 'nodejsproject',
    user: 'root',
    password: 'Omarlm10a$',
    port: 3306
});

module.exports = con;
