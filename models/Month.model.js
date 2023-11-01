const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const monthSchema = new Schema({
  name: {
    type: String,
  },
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "year",
  },
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],
  incomeSum: { type: Number, default: 0 },
  expenseSum: { type: Number, default: 0 },
});

const Month = model("Month", monthSchema);

module.exports = Month;
