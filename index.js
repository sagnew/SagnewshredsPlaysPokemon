"use strict";

const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();

const gameboyButtons = ['a', 'b', 'left', 'right', 'up', 'down', 'start', 'select'];

const keys = ['', 'start', 'up', 'select', 'left', '', 'right', 'a', 'down', 'b'];

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello Thanks for joining my stream!');
});

app.post('/sms', (req, res) => {
  let message = req.body.Body;
  let button = message.toLowerCase();
  let twiml = new twilio.TwimlResponse();
  let buttonText = 'Buttons: a(7), b(9), start(1), select(3), up(2), down(8), left(4), right(6).';

  if(gameboyButtons.indexOf(button) > -1) {
    twiml.message('Thanks for playing Pokemon with me :)');
    if(button === 'a' || button === 'b') {
      button = button.toUpperCase();
    }
    fs.writeFileSync('button.txt', button, 'utf8');
  } else {
    twiml.message('Please send a valid Gameboy button.');
  }

  res.send(twiml.toString());
});

app.post('/handle-key', (req, res) => {
  let digitPressed = req.body.Digits;
  let button = keys[digitPressed];

  if(gameboyButtons.indexOf(button) > -1) {
    if(button === 'a' || button === 'b') {
      button = button.toUpperCase();
    }
    fs.writeFileSync('button.txt', button, 'utf8');
  }
  console.log(digitPressed);

  let twiml = new twilio.TwimlResponse();
  twiml.gather({
    numDigits: '1',
    action: '/handle-key',
    method: 'POST',
    timeout: '1000'
  });

  res.send(twiml.toString());
});

app.post('/voice', (req, res) => {
  console.log(req.body.Body);

  let twiml = new twilio.TwimlResponse();
  twiml.gather({
    numDigits: '1',
    action: '/handle-key',
    method: 'POST',
    timeout: '1000'
  });

  res.send(twiml.toString());
});

app.listen(3000, console.log('Listening on port 3000'));
