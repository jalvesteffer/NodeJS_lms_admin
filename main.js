const bodyParser = require('body-parser')
const express = require('express');
const http = require('http');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
app.use(bodyParser.json());

app.get('/lms/healthcheck', (req, res) => {
  res.end('LMS API Running');
})

app.use(require('./controllers/adminController'));

// start server at port
const server = http.createServer(app).listen(3001);
console.log('Server running in port: 3001 ...')

module.exports = app;