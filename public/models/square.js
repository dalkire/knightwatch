define([
  'backbone'
], function(Backbone) {
  var SquareModel = Backbone.Model.extend({
    initialize: function(options) {
      this.set({
        'color': options.color,
        'piece': options.piece,
        'highlight': options.highlight
      });
    }
  });

  return SquareModel;
});
