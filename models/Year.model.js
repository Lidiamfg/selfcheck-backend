const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const yearSchema = new Schema({
  name: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  month: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Month",
    },
  ],
  monthIncomeSum: { type: Number, default: 0 },
  monthExpenseSum: { type: Number, default: 0 },
});

const Year = model("Year", yearSchema);

module.exports = Year;
