define([
  'jquery',
  'underscore',
  'backbone',
  'models/square'
], function($, _, Backbone, SquareModel) {
  var SquareView = Backbone.View.extend({
    render: function() {
      return this;
    }
  });

  return SquareView;
});
