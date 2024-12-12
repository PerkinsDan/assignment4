const express = require("express");
const boatModel = require("../models/boatModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const boat = new boatModel({
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        capacity: req.body.capacity,
    });

    try {
        const savedBoat = await boat.save();
        res.status(200).json(savedBoat);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const boats = await boatModel.find();
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const boats = await boatModel.findById(id);
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
