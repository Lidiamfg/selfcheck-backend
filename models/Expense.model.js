const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseSchema = new Schema(
    {
        name: { type: String, unique: true },
        value: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        month: { type: String, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
        year: Number,
    },
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;