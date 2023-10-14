const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/api/values', (request, response) => {
  db.pool.query('SELECT * FROM lists;', (error, result, field) => {
    if (error) {
      return response.status(500).send(error);
    } else {
      return response.json(result);
    }
  });
});

app.post('/api/value', (request, response) => {
  console.log(request);
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${request.body.value}")`,
    (error, result, field) => {
      if (error) {
        return response.status(500).send(error);
      } else {
        return response.json({ success: true, value: request.body.value });
      }
    }
  );
});

app.listen(8080, () => console.log('8080번 포트에서 실행됩니다.'));
