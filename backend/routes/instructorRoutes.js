const express = require("express");
const instructorModel = require("../models/instructorModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const instructor = new instructorModel({
        name: req.body.name,
        yearsExperience: req.body.yearsExperience,
    });

    try {
        const savedInstructor = await instructor.save();
        res.status(200).json(savedInstructor);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const instructors = await instructorModel.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const instructors = await instructorModel.findById(id);
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/", async (req, res) => {
    try {
        const instructors = await instructorModel.deleteMany();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const instructors = await instructorModel.findByIdAndDelete(id);
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
