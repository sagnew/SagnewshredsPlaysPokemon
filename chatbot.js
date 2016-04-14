// Do NOT include this line if you are using the browser version.
var irc = require("tmi.js");

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
  client.say('sagnewshreds', 'HELLO TWITCH WHAT UP');
});

client.on("chat", function (channel, user, message, self) {
  console.log(user.username + ': ' + message);
});
