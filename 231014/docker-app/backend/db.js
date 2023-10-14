const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

exports.pool = pool;
