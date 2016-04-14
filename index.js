"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello PlayersTwitch! Thanks for joining my stream.');
});

app.listen(3000, console.log('Listening on port 3000'));
