define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var SquareView = Backbone.View.extend({
    initialize: function(options) {
      this.dispatcher = options.dispatcher || _.extend({}, Backbone.Events);
      this.dispatcher.on('boardStringParsed', this.boardStringParsed, this);
      this.file = this.model.get('file');
      this.rank = this.model.get('rank');
    },
    render: function() {
      this.$el.html('');

      return this;
    },
    boardStringParsed: function (boardString) {
      var imgPre = 'images/pieces/';
      var imgSuf = '.png';
      var index = (this.rank - 1) * 8 + (this.file - 1);
      var newPiece = boardString[index];

      if (newPiece != this.piece) {
        if (newPiece == '-') {
          this.$el.empty();
        }
        else {
          var imgStr = 'b' + newPiece;
          if (newPiece == newPiece.toUpperCase()) {
            imgStr = 'w' + newPiece.toLowerCase();
          }

          this.$el.html('<img src="' + imgPre + imgStr + imgSuf + '" />');
        }

        this.piece = newPiece;
      }
    }
  });

  return SquareView;
});
