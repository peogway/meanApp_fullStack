const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserByUsername = async function (username) {
  return await User.findOne({ username: username });
};

module.exports.addUser = async function (newUser) {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
  } catch (err) {
    throw err;
  }
};

module.exports.comparePassword = async function (candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};
