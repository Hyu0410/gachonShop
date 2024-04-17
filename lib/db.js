var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'No connection established',
    user: 'admin',
    password: 'phy20010410',
    database: 'webdb2023'
});
db.connect();
module.exports = db;
