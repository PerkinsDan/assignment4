const app = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI);

    console.log("Connected to database");
});

afterAll(async () => {
    await mongoose.connection.close();
});

let instructor;

beforeEach(async () => {
    instructor = await requestWithSupertest.post("/api/instructors").send({
        name: "Test Instructor",
        yearsExperience: 1,
    });
});

describe("Instructors API", () => {
    it("should retrieve all instructors with GET /api/instructors", async () => {
        const response = await requestWithSupertest.get("/api/instructors");
        expect(response.status).toBe(200);
    });

    it("should retrieve a specific instructor by ID with GET /api/instructors/:id", async () => {
        const response = await requestWithSupertest.get(
            `/api/instructors/${instructor.body._id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Instructor");
    });

    it("should return 400 for invalid instructor ID with GET /api/instructors/:id", async () => {
        const response = await requestWithSupertest.get(
            "/api/instructors/invalidID"
        );
        expect(response.status).toBe(400);
    });

    it("should create a new instructor with POST /api/instructors", async () => {
        const response = await requestWithSupertest
            .post("/api/instructors")
            .send({
                name: "Test Instructor 2",
                yearsExperience: 2,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Instructor 2");
    });

    it("should update an existing instructor with PUT /api/instructors/:id", async () => {
        const response = await requestWithSupertest
            .put(`/api/instructors/${instructor.body._id}`)
            .send({
                name: "Test Instructor 3",
                yearsExperience: 3,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Instructor 3");
    });

    it("should return 400 for invalid instructor ID with PUT /api/instructors/:id", async () => {
        const response = await requestWithSupertest.put(
            "/api/instructors/invalidID"
        );
        expect(response.status).toBe(400);
    });

    it("should return 400 for missing fields with POST /api/instructors", async () => {
        const response = await requestWithSupertest
            .post("/api/instructors")
            .send({
                name: "Incomplete Instructor",
            });

        expect(response.status).toBe(400);
    });

    it("should delete an instructor with DELETE /api/instructors/:id", async () => {
        const response = await requestWithSupertest.delete(
            `/api/instructors/${instructor.body._id}`
        );
        expect(response.status).toBe(200);
    });

    it("should return 400 for invalid instructor ID with DELETE /api/instructors/:id", async () => {
        const response = await requestWithSupertest.delete(
            "/api/instructors/invalidID"
        );
        expect(response.status).toBe(400);
    });
});
