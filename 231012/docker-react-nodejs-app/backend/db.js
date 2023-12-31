const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: process.env.MYSQL_PORT,
  // host: 'mysql',
  // user: 'root',
  // password: 'mannmae',
  // database: 'myapp',
  // port: 3306,
});

exports.pool = pool;
