const express = require('express');

const app = express();

app.get('/person/:input', (req, res) => {
  res.send({
    val1: parseInt(Math.random() * 1000),
    val2: parseInt(Math.random() * 1000),
  });
});

app.get('/facility/:val1', (req, res) => {
  res.send({
    val3: parseInt(Math.random() * 1000),
    val4: parseInt(Math.random() * 1000),
  });
});

app.get('/exposure/:val2', (req, res) => {
  res.send({
    val5: parseInt(Math.random() * 1000),
  });
});

app.listen(8888, () => {
  console.log('The app is listening');
});
