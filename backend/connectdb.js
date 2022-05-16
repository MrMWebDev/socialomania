const mysql = require('mysql');
console.log('Connecting to database...');
let connectdb = mysql.createConnection({ 
    host: 'localhost',
    port: '3300',
    user: 'root', 
    password: 'password', 
    database: 'groupomania_database', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connected!')
});

module.exports = connectdb;
