const SoundTrack = require('../../schema/soundtrack.js');
const Movie = require('../../schema/movie');

module.exports = {
    movies: async () => {
        try {
            const movie = await Movie.find({}).populate("soundtrack")
            return movie
        } catch (err) {
            throw new Error(err)
        }
    },
}