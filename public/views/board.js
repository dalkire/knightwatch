define([
  'jquery',
  'underscore',
  'backbone',
  'collections/squares',
  'views/square'
], function($, _, Backbone, SquaresCollection, SquareView) {
  var BoardView = Backbone.View.extend({
    className: 'board-view',
    initialize: function(options) {
      this.dispatcher = options.dispatcher || _.extend({}, Backbone.Events);
      this.dispatcher.on('boardStringParsed', this.boardStringParsed, this);
      
      // Upper-left to lower-right as white (a8-h1)
      var squaresArray = [];
      for (var i = 0; i < 64; i++) {
        var color = (i % 2 == 0) ? 'white' : 'black';
        squaresArray[i] = { color: color };
      }

      this.collection = new SquaresCollection(squaresArray);
      console.log(this.collection);
    },
    render: function() {
      var that = this;
      this.$el.html('');

      this.collection.each(function(squareModel) {
        var classes = 'square-view ' + squareModel.get('color');
        var squareView = new SquareView({
          model: squareModel,
          className: classes
        });

        that.$el.append(squareView.render().el);
      });
      
      return this;
    },
    boardStringParsed: function(boardString) {
      // var _this = this;

      // this.$el.html('');

      // _.each(boardString, function(sq) {
      //   _this.$el.append('<div>' + sq + '</div>');
      // });

      // console.log('boardView, boardString: ', boardString);
    }
  });

  return BoardView;
});
