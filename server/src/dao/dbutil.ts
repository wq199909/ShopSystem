const mysql = require('mysql');

function createConnection(){
    const connection = mysql.createConnection({
        host     : '127.0.0.1',
        port     : '3306',
        user     : 'root',
        password : 'wq1999..',
        database : 'shop'
    }); 
    return connection;
}

module.exports.createConnection = createConnection;