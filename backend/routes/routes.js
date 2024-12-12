const express = require("express");
const activityRoutes = require("./activityRoutes");
const boatRoutes = require("./boatRoutes");
const instructorRoutes = require("./instructorRoutes");

const router = express.Router();

router.use("/activities", activityRoutes);
router.use("/boats", boatRoutes);
router.use("/instructors", instructorRoutes);

module.exports = router;
