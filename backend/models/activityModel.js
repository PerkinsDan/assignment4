const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    boats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Boat",
        },
    ],
});

const activityModel = mongoose.model("Activity", activitySchema);

module.exports = activityModel;
