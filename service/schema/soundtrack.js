const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const soundtrackSchema = new Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model("soundtracks", soundtrackSchema);
