"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello Thanks for joining my stream!');
});

app.post('/sms', (req, res) => {
  console.log(req.body.Body);

  let twiml = new twilio.TwimlResponse();
  twiml.message('Thanks for joining my stream and texting this number :)');

  res.send(twiml.toString());
});

app.post('/voice', (req, res) => {
  console.log(req.body.Body);

  let twiml = new twilio.TwimlResponse();
  twiml.play('http://demo.brooklynhacker.com/music/classic.mp3');

  res.send(twiml.toString());
});

app.listen(3000, console.log('Listening on port 3000'));
