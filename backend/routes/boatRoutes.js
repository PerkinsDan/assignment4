const express = require("express");
const Boat = require("../classes/boat");

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, model, manufacturer, capacity } = req.body;
    const boat = new Boat(name, model, manufacturer, capacity);

    try {
        const savedBoat = await boat.save();
        res.status(200).json(savedBoat);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, model, manufacturer, capacity } = req.body;

    try {
        const updatedBoat = await Boat.updateById(
            id,
            name,
            model,
            manufacturer,
            capacity
        );
        res.status(200).json(updatedBoat);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const boats = await Boat.findAll();
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const boats = await Boat.findById(id);
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/", async (req, res) => {
    try {
        const boats = await Boat.deleteAll();
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const boats = await Boat.deleteById(id);
        res.status(200).json(boats);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
