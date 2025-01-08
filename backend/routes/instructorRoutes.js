const express = require("express");
const instructorModel = require("../models/instructorModel");
const Instructor = require("../models/instructorModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, yearsExperience } = req.body;

    const instructor = new instructorModel(name, yearsExperience);

    try {
        const savedInstructor = await instructor.save();
        res.status(200).json(savedInstructor);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const instructors = await Instructor.findAll();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const instructors = await Instructor.findById(id);
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/", async (req, res) => {
    try {
        const instructors = await Instructor.deleteAll();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const instructors = await Instructor.deleteById(id);
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, yearsExperience } = req.body;

    try {
        const instructors = await Instructor.updateById(
            id,
            name,
            yearsExperience
        );
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
