const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/CenterInfo');

const UserModel = mongoose.Schema({
  slotToken: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username field must not empty"],
    minLength: [4, "Username field must have atleast 4 characters"],
  },
  password: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
});
UserModel.plugin(plm);
const user = mongoose.model("user", UserModel);
module.exports = user;
