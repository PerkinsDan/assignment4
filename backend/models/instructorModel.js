const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yearsExperience: {
        type: Number,
        required: true,
    },
});

instructorSchema.pre("findOneAndDelete", async function (next) {
    const instructorId = this.getQuery()._id;

    // Remove references from activities
    await mongoose
        .model("Activity")
        .updateMany(
            { instructors: instructorId },
            { $pull: { instructors: instructorId } }
        );

    next();
});

const instructorModel = mongoose.model("Instructor", instructorSchema);

module.exports = instructorModel;
