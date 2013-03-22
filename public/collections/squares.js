define([
  'backbone',
  'models/square'
], function(Backbone, SquareModel) {
  var SquaresCollection = Backbone.Collection.extend({
    model: SquareModel
  });

  return SquaresCollection;
});
