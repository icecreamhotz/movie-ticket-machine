const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const reserveSchema = new Schema({
    email: String,
    price_total: Number,
    change_total: Number,
    people_total: Number,
    createdAt: String,
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movies"
    }
})

module.exports = mongoose.model("reserves", reserveSchema)