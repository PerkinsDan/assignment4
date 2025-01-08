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

class Boat {
    constructor(name, model, manufacturer, capacity) {
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
        this.capacity = capacity;
    }

    async save() {
        const boat = new boatModel({
            name: this.name,
            model: this.model,
            manufacturer: this.manufacturer,
            capacity: this.capacity,
        });

        return await boat.save();
    }

    static async findAll() {
        return await boatModel.find();
    }

    static async findById(id) {
        return await boatModel.findById(id);
    }

    static async deleteMany() {
        return await boatModel.deleteMany();
    }

    static async deleteOne(id) {
        return await boatModel.findByIdAndDelete(id);
    }

    static async updateById(id, name, model, manufacturer, capacity) {
        return await boatModel.findByIdAndUpdate(id, {
            name,
            model,
            manufacturer,
            capacity,
        });
    }
}

module.exports = Boat;
