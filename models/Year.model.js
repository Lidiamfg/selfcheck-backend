const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const yearSchema = new Schema({
  year: Number,
  month: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Month",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Year = model("Year", yearSchema);

module.exports = Year;
