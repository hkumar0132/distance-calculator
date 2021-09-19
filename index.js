const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { getDistance } = require("./api/index.js");

const app = express();

const PORT = process.env.PORT || 3000;

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.status(200).send(`GET request working`);
});

app.post('/get-distance', async (req, res) => {
  return await getDistance(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});