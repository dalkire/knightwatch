define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var SquareView = Backbone.View.extend({
    initialize: function(options) {
      this.dispatcher = options.dispatcher || _.extend({}, Backbone.Events);
      this.dispatcher.on('moveString', this.moveString, this);
      this.file = this.model.get('file');
      this.rank = this.model.get('rank');
      this.coord = this.model.get('coord');
    },
    render: function() {
      this.$el.html('');

      return this;
    },
    moveString: function (moveString) {
      var moveArray = moveString.split(' ');
      var verboseMove = moveArray[26];
      var prettyMove = moveArray[28];
      console.log('prettyMove: ', prettyMove);
      var boardString = this.parseBoardString(moveString);
      var imgPre = 'images/pieces/';
      var imgSuf = '.png';

      // Remember that the board string goes from a8 to h1
      var index = (8- this.rank) * 8 + (this.file - 1);
      var newPiece = boardString[index];
      var highlightSquares = verboseMove.match(/[a-h]{1}[1-8]{1}/g);
      console.log('highlightSquares: ', highlightSquares);
      console.log('coord: ', this.coord);
      if ($.inArray(this.coord, highlightSquares) != -1) {
        this.$el.addClass('highlight');
        console.log('highlight: ', this.coord);
      }
      else {
        this.$el.removeClass('highlight');
      }

      if (newPiece != this.piece) {
        if (newPiece == '-') {
          this.$el.empty();
        }
        else {
          var imgStr = 'b' + newPiece;
          if (newPiece == newPiece.toUpperCase()) {
            imgStr = 'w' + newPiece.toLowerCase();
          }

          this.$el.html('<img class="piece" src="' + imgPre + imgStr + imgSuf + '" />');
        }

        this.piece = newPiece;
      }
    },
    parseBoardString: function(moveString) {
      var moveArray = moveString.split(' ');
      var boardArray = moveArray.slice(0,8);
      var boardString = boardArray.join('');

      return boardString;
    }
  });

  return SquareView;
});
