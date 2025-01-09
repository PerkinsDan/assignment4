const activityModel = require("../models/activityModel");
const Base = require("./base");

class Activity extends Base {
    constructor(name, date, instructor, boats) {
        super();
        this.name = name;
        this.date = date;
        this.instructor = instructor;
        this.boats = boats;
    }

    async save() {
        const { name, date, instructor, boats } = this;
        return await super.save({ name, date, instructor, boats });
    }

    static async updateById(id, name, date, instructor, boats) {
        return await super.updateById(id, {
            name,
            date,
            instructor,
            boats,
        });
    }
}

Activity.setModel(activityModel);

module.exports = Activity;
