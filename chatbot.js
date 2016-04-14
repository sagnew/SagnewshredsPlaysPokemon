// Do NOT include this line if you are using the browser version.
var irc = require("tmi.js");
var fs = require('fs');
var gameboyButtons = ['a', 'b', 'left', 'right', 'up', 'down', 'start', 'select'];

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "Sagnewshreds",
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ["#sagnewshreds"]
};

var client = new irc.client(options);

// Connect the client to the server..
client.connect();
client.on('connected', function(channel, user, message, self) {
  client.say('sagnewshreds', 'THIS IS NOW TWITCH PLAYS POKEMON CHAT! HYPE!');
});

client.on("chat", function (channel, user, message, self) {
  var button = message.toLowerCase();

  console.log(user.username + ': ' + message);
  if(gameboyButtons.indexOf(button) >= 0) {
    if(button === 'a' || button === 'b') {
      button = button.toUpperCase();
    }
    fs.writeFileSync('button.txt', button, 'utf8');
  }
});
