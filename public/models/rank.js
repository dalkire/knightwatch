define([
  'backbone',
  'collections/squares'
], function(Backbone, SquaresCollection) {
  var RankModel = Backbone.Model.extend({
    initialize: function(options) {
      var parity = (this.get('id') % 2 == 0) ? 'even' : 'odd';
      var color = (parity == 'odd') ? 'white' : 'black';
      var squaresArr = [];

      for (var i = 1; i <= 8; i++) {
        squaresArr.push({
          id: i,
          color: color,
          file: i,
          rank: this.get('id')
        });

        color = (color == 'white') ? 'black' : 'white';
      }

      this.set({
        'squares': new SquaresCollection(squaresArr)
      });
    }
  });

  return RankModel;
});
