define([
  'jquery',
  'underscore',
  'backbone',
  'views/square'
], function($, _, Backbone, SquareView) {
  var RankView = Backbone.View.extend({
    className: 'rank-view',
    initialize: function(options) {
      this.dispatcher = options.dispatcher || _.extend({}, Backbone.Events);
    },
    render: function() {
      var that = this;

      this.$el.html('');

      this.model.get('squares').each(function(squareModel) {
        var files = 'abcdefgh';
        var index = squareModel.get('id') - 1;
        var id = '' + files[index] + that.model.get('id');
        var className = 'square-view ' + squareModel.get('color');
        var squareView = new SquareView({
          id: id,
          className: className,
          model: squareModel,
          dispatcher: that.dispatcher
        });

        that.$el.append(squareView.render().el);
      });

      return this;
    }
  });

  return RankView;
});
