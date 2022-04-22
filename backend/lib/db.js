const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'socialomania',
  password: 'Tihanymari0'
});

connection.connect();
module.exports = connection;