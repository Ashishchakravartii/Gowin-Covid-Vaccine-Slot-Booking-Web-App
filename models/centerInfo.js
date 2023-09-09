const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/CenterInfo');

const Centers = mongoose.Schema({
  slotToken: {
    type: String,
    default: null,
  },
  center_id: Number,
  center_name: String,
  address: String,
  pincode: Number,
  available_slots: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{timestamps: true });

const center = mongoose.model("centerInfo", Centers);
module.exports = center;
