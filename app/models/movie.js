// Generated by CoffeeScript 1.9.3
(function() {
  var Movie, MovieSchema, mongoose;

  mongoose = require('mongoose');

  MovieSchema = require('../schemas/movie');

  Movie = mongoose.model('Movie', MovieSchema);

  module.exports = Movie;

}).call(this);

//# sourceMappingURL=movie.js.map
