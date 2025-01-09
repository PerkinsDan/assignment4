const mongoose = require("mongoose");

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
});

const boatModel = mongoose.model("Boat", boatSchema);

module.exports = boatModel;
