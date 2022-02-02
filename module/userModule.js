const { date } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  biz: {
    type: Boolean,
    required: true,
    default: false,
  },
  createAt: {
    type: String,
    required: true,
    default: Date.now,
  },
});

const user = mongoose.model("dataToProject", userSchema);

const createUser = (userName, email, password, biz, createAt) => {
  const newUser = new user({ userName, email, password, biz, createAt });
  return newUser.save();
};
const findUserByEmail = (email) => {
  return user.find({ email: email });
};
module.exports = {
  createUser,
  findUserByEmail,
};
