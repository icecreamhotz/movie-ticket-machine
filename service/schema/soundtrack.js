const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const soundtrackSchema = new Schema({
    title: String
})

module.exports = mongoose.model("soundtracks", soundtrackSchema)