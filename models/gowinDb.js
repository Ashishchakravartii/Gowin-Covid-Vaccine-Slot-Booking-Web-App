const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/gowinDb")
  .then(console.log("Db connected"))
  .catch((console.error()));

