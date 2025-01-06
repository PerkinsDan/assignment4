const express = require("express");
const activityModel = require("../models/activityModel");
const boatModel = require("../models/boatModel");
const instructorModel = require("../models/instructorModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const instructor = req.body.instructor;
    const boats = req.body.boats;

    if (name === "" || date === "" || instructor === "" || boats === "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await instructorModel.findById(instructor);
    } catch (error) {
        return res.status(400).json({ message: "Instructor not found" });
    }

    for (let i = 0; i < boats.length; i++) {
        try {
            await boatModel.findById(boats[i]);
        } catch (error) {
            return res.status(400).json({ message: "Boat/s not found" });
        }
    }

    const activity = new activityModel({
        name,
        date,
        instructor,
        boats,
    });

    try {
        const savedActivity = await activity.save();
        res.status(200).json(savedActivity);
    } catch (error) {
        res.status(400).json({ message: "Error creating activity" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const date = req.body.date;
    const instructor = req.body.instructor;
    const boats = req.body.boats;

    if (name === "" || date === "" || instructor === "" || boats === "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await instructorModel.findById(instructor);
    } catch (error) {
        return res.status(400).json({ message: "Instructor not found" });
    }

    for (let i = 0; i < boats.length; i++) {
        try {
            await boatModel.findById(boats[i]);
        } catch (error) {
            return res.status(400).json({ message: "Boat/s not found" });
        }
    }

    try {
        const activity = await activityModel.findById(id);

        activity.name = name;
        activity.date = date;
        activity.instructor = instructor;
        activity.boats = boats;

        const savedActivity = await activity.save();
        res.status(200).json(savedActivity);
    } catch (error) {
        res.status(400).json({ message: "Error updating activity" });
    }
});

router.get("/", async (req, res) => {
    try {
        const activities = await activityModel.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const activities = await activityModel.findById(id);
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/", async (req, res) => {
    try {
        const activities = await activityModel.deleteMany();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const activities = await activityModel.findByIdAndDelete(id);
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
