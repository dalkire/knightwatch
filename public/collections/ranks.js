define([
  'backbone',
  'models/rank'
], function(Backbone, RankModel) {
  var RanksCollection = Backbone.Collection.extend({
    model: RankModel
  });

  return RanksCollection;
});
