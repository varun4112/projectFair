const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: [3, "Must be Atleast 3, got {VALUE}"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    require: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  profile: {
    type: String,
  },
});
module.exports = mongoose.model("users", userSchema);
module.exports.users;
