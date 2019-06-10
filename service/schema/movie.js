const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    logo: String,
    description: String,
    price: Number,
    soundtrack: {
        type: Schema.Types.ObjectId,
        ref: "soundtracks"
    }
})

module.exports = mongoose.model("movies", movieSchema)