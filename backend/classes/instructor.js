const instructorModel = require("../models/instructorModel");

class Instructor {
    constructor(name, yearsExperience) {
        this.name = name;
        this.yearsExperience = yearsExperience;
    }

    async save() {
        const instructor = new instructorModel({
            name: this.name,
            yearsExperience: this.yearsExperience,
        });

        try {
            const savedInstructor = await instructor.save();
            return savedInstructor;
        } catch (error) {
            return error;
        }
    }

    static async findAll() {
        try {
            const instructors = await instructorModel.find();
            return instructors;
        } catch (error) {
            return error;
        }
    }

    static async findById(id) {
        try {
            const instructors = await instructorModel.findById(id);
            return instructors;
        } catch (error) {
            return error;
        }
    }

    static async deleteAll() {
        try {
            const instructors = await instructorModel.deleteMany();
            return instructors;
        } catch (error) {
            return error;
        }
    }

    static async deleteById(id) {
        try {
            const instructors = await instructorModel.findByIdAndDelete(id);
            return instructors;
        } catch (error) {
            return error;
        }
    }

    static async updateById(id, name, yearsExperience) {
        try {
            const instructors = await instructorModel.findByIdAndUpdate(id, {
                name: name,
                yearsExperience: yearsExperience,
            });
            return instructors;
        } catch (error) {
            return error;
        }
    }
}

module.exports = Instructor;
