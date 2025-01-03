const express = require("express");
const activityModel = require("../models/activityModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const activity = new activityModel({
        name: req.body.name,
        date: req.body.date,
        instructor: req.body.instructor,
        boats: req.body.boats,
    });

    try {
        const savedActivity = await activity.save();
        res.status(200).json(savedActivity);
    } catch (error) {
        res.status(400).json({ message: error });
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
