const instructorModel = require("../models/instructorModel");
const Base = require("./base");

class Instructor extends Base {
    constructor(name, yearsExperience) {
        super();
        this.name = name;
        this.yearsExperience = yearsExperience;
    }

    async save() {
        const { name, yearsExperience } = this;
        return await super.save({ name, yearsExperience });
    }

    static async updateById(id, name, yearsExperience) {
        return await super.updateById(id, {
            name,
            yearsExperience,
        });
    }
}

Instructor.setModel(instructorModel);

module.exports = Instructor;
