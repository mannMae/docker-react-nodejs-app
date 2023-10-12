const express = require('express');

const db = require('./db');

const app = express();

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROOM lists;', (error, result, fields) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.json(result);
    }
  });
});

app.listen(8080, () => console.log('8080번 포트로 실행됩니다'));
