const activityModel = require("../models/activityModel");

class Activity {
    constructor(name, date, instructor, boats) {
        this.name = name;
        this.date = date;
        this.instructor = instructor;
        this.boats = boats;
    }

    async save() {
        const { name, date, instructor, boats } = this;

        const activity = new activityModel({
            name,
            date,
            instructor,
            boats,
        });

        return await activity.save();
    }

    static async findById(id) {
        return await activityModel.findById(id);
    }

    static async findAll() {
        return await activityModel.find();
    }

    static async deleteAll() {
        return await activityModel.deleteMany();
    }

    static async deleteById(id) {
        return await activityModel.findByIdAndDelete(id);
    }

    static async updateById(id, name, date, instructor, boats) {
        return await activityModel.findByIdAndUpdate(id, {
            name,
            date,
            instructor,
            boats,
        });
    }
}

module.exports = Activity;
