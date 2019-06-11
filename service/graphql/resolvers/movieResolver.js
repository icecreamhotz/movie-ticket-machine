const SoundTrack = require("../../schema/soundtrack.js");
const Movie = require("../../schema/movie");

module.exports = {
  movies: async () => {
    try {
      const movies = await Movie.find({}).populate("soundtrack");
      return movies;
    } catch (err) {
      throw new Error(err);
    }
  },
  movie: async args => {
    try {
      const movie = await Movie.findById(args.id).populate("soundtrack");
      return movie;
    } catch (err) {
      throw new Error(err);
    }
  }
};
