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
        console.log(that);

        var files = 'abcdefgh';
        var index = 8 - that.model.get('id');
        var id = '' + files[index] + squareModel.get('id');
        var className = 'square-view ' + squareModel.get('color');
        var squareView = new SquareView({
          id: id,
          className: className,
          model: squareModel,
          dispatcher: that.dispatcher
        });

        that.$el.append(squareView.render().el);
      });

      console.log('rankView model: ', this.model.toJSON());
      return this;
    }
  });

  return RankView;
});
