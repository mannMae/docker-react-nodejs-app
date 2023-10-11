const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/values', (req, res) => {
  console.log('DATABASE', db);
  db.pool.query('SELECT * FROM lists;', (error, result, fileds) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.json(result);
    }
  });
});

app.post('/api/value', (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (error, result, fileds) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(8080, () => {
  console.log('어플리케이션이 8080번 포트에서 시작되었습니다.');
});
