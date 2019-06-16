const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const validateEmail = email => {
  if (email === "") return true;
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  email: {
    type: String,
    validate: [validateEmail, "Please fill a valid email address"]
  }
});

module.exports = mongoose.model("users", userSchema);
