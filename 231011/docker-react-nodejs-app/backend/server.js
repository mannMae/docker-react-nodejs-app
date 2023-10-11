const express = require('express');

const db = require('./db');

const app = express();

db.pool.query(
  `CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
  )`,
  (err, result, fileds) => {
    console.log('results', results);
  }
);

// app.get('/api/values', (req, res) => {
//   db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
//     if (err) {
//       return res.status(500).send(err);
//     } else {
//       return res.json(results);
//     }
//   });
// });

app.listen(8080, () => console.log('8080번 포트로 실행됩니다'));
