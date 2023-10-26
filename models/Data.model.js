const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema(
    {
        category: { type: String, enum: ["Income", "Expense"] },
        description: String,
        value: Number,
        month: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Month"
        },
    },
);

const Data = model("Data", dataSchema);

module.exports = Data;