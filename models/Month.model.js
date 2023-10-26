const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const monthSchema = new Schema({
    name: { type: String, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "year",
    },
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Data",
    }],
});

const Month = model("Month", monthSchema);

module.exports = Month;
