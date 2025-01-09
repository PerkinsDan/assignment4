const express = require("express");
const Activity = require("../classes/activity");
const Instructor = require("../classes/instructor");
const Boat = require("../classes/boat");

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, date, instructor, boats } = req.body;

    if (name === "" || date === "" || instructor === "" || boats === "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await Instructor.findById(instructor);
    } catch (error) {
        return res.status(400).json({ message: "Instructor not found" });
    }

    for (let i = 0; i < boats.length; i++) {
        try {
            await Boat.findById(boats[i]);
        } catch (error) {
            return res.status(400).json({ message: "Boat/s not found" });
        }
    }

    const activity = new Activity(name, date, instructor, boats);

    try {
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating activity" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, date, instructor, boats } = req.body;

    if (name === "" || date === "" || instructor === "" || boats === "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await Instructor.findById(instructor);
    } catch (error) {
        return res.status(400).json({ message: "Instructor not found" });
    }

    for (let i = 0; i < boats.length; i++) {
        try {
            await Boat.findById(boats[i]);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Boat/s not found" });
        }
    }

    try {
        const savedActivity = await Activity.updateById(
            id,
            name,
            date,
            instructor,
            boats
        );
        res.status(200).json(savedActivity);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating activity" });
    }
});

router.get("/", async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const activities = await Activity.findById(id);
        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
});

router.delete("/", async (req, res) => {
    try {
        const activities = await Activity.deleteAll();
        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const activities = await Activity.deleteById(id);
        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
});

module.exports = router;
