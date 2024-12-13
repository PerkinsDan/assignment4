const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// Database connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);
const database = mongoose.connection;

database.on("error", (error) => console.error(error));
database.once("open", () => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api", routes);
