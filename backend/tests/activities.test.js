const app = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);
const mongoose = require("mongoose");
require("dotenv").config();

let boat;
let instructor;

beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI);

    console.log("Connected to database");

    boat = await requestWithSupertest.post("/api/boats").send({
        name: "Test Boat",
        model: "Test Model",
        manufacturer: "Test Manufacturer",
        capacity: 1,
    });

    instructor = await requestWithSupertest.post("/api/instructors").send({
        name: "Test Instructor",
        yearsExperience: 1,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

let activity;

beforeEach(async () => {
    activity = await requestWithSupertest.post("/api/activities").send({
        name: "Test Activity",
        date: "2021-10-10",
        instructor: instructor.body._id,
        boats: [boat.body._id],
    });
});

describe("Activities API", () => {
    it("should return status 200", async () => {
        const response = await requestWithSupertest.get("/api/activities");
        expect(response.status).toBe(200);
    });

    it("should return status 200 and the correct activity", async () => {
        const response = await requestWithSupertest.get(
            `/api/activities/${activity.body._id}`
        );
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Activity");
    });

    it("should create a new activity and return status 201", async () => {
        const response = await requestWithSupertest
            .post("/api/activities")
            .send({
                name: "Test Activity",
                date: "2021-10-10",
                instructor: instructor.body._id,
                boats: [boat.body._id],
            });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Test Activity");
    });

    it("should return status 400 for invalid POST data", async () => {
        const response = await requestWithSupertest
            .post("/api/activities")
            .send({
                name: "",
                date: "invalid-date",
                instructor: "invalidID",
                boats: ["invalidID"],
            });
        expect(response.status).toBe(400);
    });

    it("should update the activity and return status 200", async () => {
        const response = await requestWithSupertest
            .put(`/api/activities/${activity.body._id}`)
            .send({
                name: "Updated Test Activity",
                date: "2021-10-10",
                instructor: instructor.body._id,
                boats: [boat.body._id],
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Updated Test Activity");
    });

    it("should return status 400 for invalid PUT data", async () => {
        const response = await requestWithSupertest
            .put(`/api/activities/${activity.body._id}`)
            .send({
                name: "",
                date: "invalid-date",
                instructor: "invalidID",
                boats: ["invalidID"],
            });
        expect(response.status).toBe(400);
    });

    it("should delete the activity and return status 200", async () => {
        const response = await requestWithSupertest.delete(
            `/api/activities/${activity.body._id}`
        );
        expect(response.status).toBe(200);
    });

    it("should return status 400 for invalid activity ID", async () => {
        const response = await requestWithSupertest.get(
            `/api/activities/invalidID`
        );
        expect(response.status).toBe(400);
    });
});
