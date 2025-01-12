// create boats
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Boat = require("../models/boatModel");
const Instructor = require("../models/instructorModel");
const Activity = require("../models/activityModel");
const dotenv = require("dotenv");

dotenv.config();

const jsonFile = path.resolve("./json_import/data.json");
const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const importData = async () => {
    try {
        // Insert instructors
        const instructors = await Instructor.insertMany(data.instructors);
        console.log("Instructors imported:", instructors);

        // Map instructors by index (1-based) to their MongoDB IDs
        const instructorMap = instructors.reduce((acc, instructor, index) => {
            acc[index + 1] = instructor._id;
            return acc;
        }, {});

        // Insert boats
        const boats = await Boat.insertMany(data.boats);
        console.log("Boats imported:", boats);

        // Map boats by index (1-based) to their MongoDB IDs
        const boatMap = boats.reduce((acc, boat, index) => {
            acc[index + 1] = boat._id;
            return acc;
        }, {});

        // Prepare activities with the correct IDs
        const activities = data.activities.map((activity) => ({
            ...activity,
            instructor: instructorMap[activity.instructor],
            boats: activity.boats.map((boatId) => boatMap[boatId]),
        }));

        // Insert activities
        const insertedActivities = await Activity.insertMany(activities);
        console.log("Activities imported:", insertedActivities);

        console.log("Data import completed successfully!");
    } catch (error) {
        console.error("Error importing data:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the import
importData();
