const express = require('express');

var app = express();

app.get('/travel', (req, res) => {
  conosle.log('express');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.listen(3000);