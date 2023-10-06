const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());

db.pool.query(
  `CREATE TABLE lists (
      id INTEGER AUTO_INCREMENT,
      value TEXT,
      PRIMARY KEY (id)
  )`,
  (err, results, fileds) => {
    console.log(err);
    console.log('results', results);
  }
);

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists;', (error, results, fileds) => {
    console.log(error);
    console.log(results);
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.json(results);
    }
  });
});

app.post('/api/value', (req, res) => {
  return res.json('post');
});

app.listen(8080, () => {
  console.log('어플리케이션이 8080번 포트에서 시작되었습니다.');
});
