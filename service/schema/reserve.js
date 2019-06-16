const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const reserveSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  price_total: { type: Number, required: true },
  money: { type: Number, required: true },
  change_total: { type: Number, required: true },
  people_total: { type: Number, required: true },
  createdAt: { type: String, required: true },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "movies"
  }
});

module.exports = mongoose.model("reserves", reserveSchema);
