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

let boat;

beforeEach(async () => {
    boat = await requestWithSupertest.post("/api/boats").send({
        name: "Test Boat",
        model: "Test Model",
        manufacturer: "Test Manufacturer",
        capacity: 1,
    });
});

describe("Boats API", () => {
    it("GET /api/boats", async () => {
        const response = await requestWithSupertest.get("/api/boats");
        expect(response.status).toBe(200);
    });

    it("GET /api/boats/:id", async () => {
        const response = await requestWithSupertest.get(
            `/api/boats/${boat.body._id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Boat");
    });

    it("GET /api/boats/:id - invalid id", async () => {
        const response = await requestWithSupertest.get("/api/boats/invalidID");
        expect(response.status).toBe(400);
    });

    it("POST /api/boats", async () => {
        const response = await requestWithSupertest.post("/api/boats").send({
            name: "Test Boat 2",
            model: "Test Model 2",
            manufacturer: "Test Manufacturer 2",
            capacity: 2,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Test Boat 2");
    });

    it("POST /api/boats - missing fields", async () => {
        const response = await requestWithSupertest.post("/api/boats").send({
            name: "Incomplete Boat",
        });

        expect(response.status).toBe(400);
    });

    it("PUT /api/boats/:id", async () => {
        const updatedBoat = await requestWithSupertest
            .put(`/api/boats/${boat.body._id}`)
            .send({
                name: "Updated Boat",
                model: "Updated Model",
                manufacturer: "Updated Manufacturer",
                capacity: 3,
            });

        expect(updatedBoat.status).toBe(200);
        expect(updatedBoat.body.name).toBe("Updated Boat");
    });

    it("PUT /api/boats/:id - invalid id", async () => {
        const response = await requestWithSupertest
            .put("/api/boats/invalidID")
            .send({
                name: "Updated Boat",
            });

        expect(response.status).toBe(400);
    });

    it("DELETE /api/boats/:id", async () => {
        const deletedBoat = await requestWithSupertest.delete(
            `/api/boats/${boat.body._id}`
        );
        expect(deletedBoat.status).toBe(200);
    });

    it("DELETE /api/boats/:id - invalid id", async () => {
        const response = await requestWithSupertest.delete(
            "/api/boats/invalidID"
        );
        expect(response.status).toBe(400);
    });
});
