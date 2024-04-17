var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'database-1.c7myy0448fol.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'phy20010410',
    database: 'webdb2023'
});
db.connect();
module.exports = db;
