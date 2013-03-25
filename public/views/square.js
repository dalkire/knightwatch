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
      var index = (this.rank - 1) * 8 + (this.file - 1);
      var piece = boardString[index];

      if (piece != '-') {
        this.$el.html(boardString[index]);
      }
      else {
        this.$el.empty();
      }
    }
  });

  return SquareView;
});
