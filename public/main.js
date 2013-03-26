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
  'backbone',
  'views/board'
], function($, _, Backbone, BoardView) {
  var dispatcher = _.extend({}, Backbone.Events);
  var boardView = new BoardView({ dispatcher: dispatcher });

  var parseMove = function(moveString) {
    var moveArray   = moveString.split(' ');
    var boardArray  = moveArray.slice(0,8);
    var boardString = boardArray.join('');
    var whoseMove   = moveArray[8];
    var whiteName   = moveArray[16];
    var blackName   = moveArray[17];
    var whiteTime   = moveArray[23];
    var blackTime   = moveArray[24];

    dispatcher.trigger('boardStringParsed', boardString);
    dispatcher.trigger('moveString', moveString);
    dispatcher.trigger('whoseMove', whoseMove);
    dispatcher.trigger('whiteName', whiteName);
    dispatcher.trigger('blackName', blackName);
    dispatcher.trigger('whiteTime', whiteTime);
    dispatcher.trigger('blackTime', blackTime);
  };
  
  var initialize = function() {
    $('body').html(boardView.render().el);

    // Set up a socket.io reference to listen to the 'move' event
    var socket = io.connect('http://localhost:3000');
    socket.on('move', function (moveString) {
      parseMove(moveString);
    });
  };

  initialize();
});
