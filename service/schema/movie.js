const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    logo: String,
    description: String,
    price: Number,
    release_date: String,
    soundtrack: {
        type: Schema.Types.ObjectId,
        ref: "soundtracks"
    }
})

module.exports = mongoose.model("movies", movieSchema)