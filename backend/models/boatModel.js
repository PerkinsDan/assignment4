const mongoose = require("mongoose");

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

boatSchema.pre("findOneAndDelete", async function (next) {
    const boatId = this.getQuery()._id;

    // Remove references from activities
    await mongoose
        .model("Activity")
        .updateMany({ boats: boatId }, { $pull: { boats: boatId } });

    next();
});

const boatModel = mongoose.model("Boat", boatSchema);

module.exports = boatModel;
