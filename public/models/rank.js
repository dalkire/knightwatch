define([
  'backbone',
  'collections/squares'
], function(Backbone, SquaresCollection) {
  var RankModel = Backbone.Model.extend({
    initialize: function(options) {
      var parity = (this.get('id') % 2 == 0) ? 'even' : 'odd';
      var color = (parity == 'even') ? 'white' : 'black';
      var squaresArr = [];
      var fileLetters = 'abcdefgh';

      for (var i = 1; i <= 8; i++) {
        squaresArr.push({
          id: i,
          color: color,
          file: i,
          rank: this.get('id'),
          coord: fileLetters[i - 1] + this.get('id')
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
