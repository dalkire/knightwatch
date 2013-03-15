// Use net for tcp connection to FICS
// http://nodejs.org/api/net.html
var net = require('net');

var HOST = 'freechess.org';
var PORT = 5000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

var count = 0;

// Add a 'data' event handler for the client socket
// This is what we hear back from the FICS server
client.on('data', function(data) {
  // Let's watch the data stream by
  console.log(data.toString());

  // When we first receive data from the server
  if (count == 0) {
    // Sign in as a guest
    client.write('guest\n');

    count++;
  }
  // Once we sign in we can get right to it
  else if (count == 1) {
    // Send "enter" to confirm the random guest id they assign us
    client.write('\n');

    // Filter out game requests
    client.write('set seek 0\n');

    // Filter out broadcast chats
    client.write('set shout 0\n');

    // Set the style to something that will be easy to parse later
    client.write('style 12\n');

    // Begin observing the top-rated blitz game
    client.write('observe /b\n');

    count++;
  }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
