const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const incomeSchema = new Schema(
    {
        name: { type: String },
        value: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        month: { type: String, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
        year: Number,
    },
);

const Income = model("Income", incomeSchema);

module.exports = Income;