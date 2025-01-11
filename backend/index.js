const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const database = mongoose.connection;

database.on("error", (error) => console.error(error));
database.once("open", () => console.log("Connected to database"));

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

app.get("/api/stats", async (req, res) => {
    try {
        const db = database.db;

        const collections = await db.listCollections().toArray();

        const statsPromises = collections.map(async (collection) => {
            const stats = await db.command({ collStats: collection.name });
            return {
                name: collection.name,
                documentCount: stats.count,
                size: stats.size,
                storageSize: stats.storageSize,
                indexes: stats.nindexes,
                indexSize: stats.totalIndexSize,
            };
        });

        const stats = await Promise.all(statsPromises);

        res.status(200).json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.use("/api", routes);

module.exports = app;
