// Filename: main.js
require.config({
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var initialize = function() {
    // Set up a socket.io reference to listen to the 'move' event
    var socket = io.connect('http://localhost:3000');
    socket.on('move', function (data) {
      $('body').append('<div>' + data + '</div>');
    });
  };

  initialize();
});
