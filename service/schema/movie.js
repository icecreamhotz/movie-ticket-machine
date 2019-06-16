const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  release_date: { type: String, required: true },
  soundtrack: {
    type: Schema.Types.ObjectId,
    ref: "soundtracks"
  }
});

module.exports = mongoose.model("movies", movieSchema);
