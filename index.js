var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var fs = require('fs');
var {PORT, BASE_URL} = require('./configs/constant');

app.use(BASE_URL, require('./routes/timetable'));

var listener = app.listen(PORT, function() {
  console.log('Service Running on:' + listener.address().port);
});


