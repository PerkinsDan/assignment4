const boatModel = require("../models/boatModel");
const Base = require("./base");

class Boat extends Base {
    constructor(name, model, manufacturer, capacity) {
        super();
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
        this.capacity = capacity;
    }

    async save() {
        const { name, model, manufacturer, capacity } = this;
        return await super.save({ name, model, manufacturer, capacity });
    }

    static async updateById(id, name, model, manufacturer, capacity) {
        return await super.updateById(id, {
            name,
            model,
            manufacturer,
            capacity,
        });
    }
}

Boat.setModel(boatModel);

module.exports = Boat;
