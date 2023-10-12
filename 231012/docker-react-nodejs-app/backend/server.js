const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists;', (error, result, fields) => {
    console.log('get');
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.json(result);
    }
  });
});

app.post('/api/value', (req, res) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (error, result, fileds) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.json({ sucess: true, value: req.body.value });
      }
    }
  );
});

app.listen(8080, () => console.log('8080번 포트로 실행됩니다'));
