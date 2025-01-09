const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    yearsExperience: {
        type: Number,
        required: true,
    },
});

const instructorModel = mongoose.model("Instructor", instructorSchema);

module.exports = instructorModel;
