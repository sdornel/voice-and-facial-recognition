var express = require('express');

var app = express();app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3500, function () {
  console.log('Example app listening on port 3500!');
});

app.get('/facial-recognition', (req, res) => {
  res.send('hello from get request');
});