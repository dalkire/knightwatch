// Use net for tcp connection to FICS
// http://nodejs.org/api/net.html
var net = require('net');

// Use express for our web framework
// http://expressjs.com/
var express = require('express');
var app = express();

// Use http to create our http server
// http://nodejs.org/api/http.html
var server = require('http').createServer(app);

// Use socket.io for live, event-based communication
// between the node server and the browser client
// http://socket.io/
var io = require('socket.io').listen(server);

// This will be the handle for our connected socket.io socket
var sock;

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
// console.log(data.toString());
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
  else if (sock) {
    // Parse style-12 output
    var str = data.toString();
    var myRegexp = /\n\r<12> (.*?)\n\r/g;
    var match = myRegexp.exec(str);

    // If data matched a style-12 line,
    // pass that to our browser client
    if (match && match[1]) {
      sock.emit('move', match[1]);
    }
  }

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

// Set up our node server to listen to http requests on port 3000
server.listen(3000);

// Serve files statically from the public directory
app.use('/', express.static(__dirname + '/public'));

// When our node-server-to-browser-client connection is established
// assign the socket to our 'sock' handle
io.sockets.on('connection', function (socket) {
  sock = socket;
});
