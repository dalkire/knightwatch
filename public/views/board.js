define([
  'jquery',
  'underscore',
  'backbone',
  'collections/ranks',
  'views/rank'
], function($, _, Backbone, RanksCollection, RankView) {
  var BoardView = Backbone.View.extend({
    className: 'board-view',
    initialize: function(options) {
      this.dispatcher = options.dispatcher || _.extend({}, Backbone.Events);
      this.dispatcher.on('boardStringParsed', this.boardStringParsed, this);
      
      // Upper-left to lower-right as white (a8-h1)
      var ranksArray = [];
      for (var i = 8; i >= 1 ; i--) {
        ranksArray[8 - i] = { id: i };
      }

      this.collection = new RanksCollection(ranksArray);
      // console.log('==============', this.collection);
    },
    render: function() {
      var that = this;
      this.$el.html('');

      this.collection.each(function(rankModel) {
        var id = 'rank-' + rankModel.get('id');
        var rankView = new RankView({
          id: id,
          model: rankModel,
          dispatcher: that.dispatcher
        });

        that.$el.append(rankView.render().el);
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
