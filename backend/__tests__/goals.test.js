import request from 'supertest';
import createServer from '../utils/server';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import Goal from '../Models/Goal';

const app = createServer();
var testGoalId = "";
const fakeId = mongoose.Types.ObjectId();

/* Connecting to the database before each test. */
beforeEach(async () => {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_TEST_URI);

    await addMockData();
});

/* Closing database connection after each test. */
afterEach(async () => {
    await removeMockData();

    await mongoose.connection.close();
});

describe("POST /api/goals", () => {
    describe("given a title, description, goal type, status, priority value, start date, end date, creator ID, and comment IDs", () => {
        test("correct input: should respond with a 200 status code and json header", async () => {
            const response = await request(app).post("/api/goals").send({
                title: "Test Title",
                description: "Test Description",
                goalType: "Performance", 
                status: "Complete",
                priorityValue: 1,
                startDate: new Date(Date.now()),
                endDate: new Date(Date.now() + 10),
                creatorUId: '6345f6b4443e221ae2822a88',
                commentIds: [] 
            });
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            Goal.deleteMany({description: "Test Description"})
        });
    });

    describe("given no input", () => {
        test("should respond with a 500 status code and json header", async () => {
            const response = await request(app).post("/api/goals").send({ });
            expect(response.statusCode).toBe(500);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });
});

describe("GET /api/goals/byGoalId", () => {
    describe("Given a correct goal ID", () => {
        test("should respond with a 200 status code and json header", async () => {
            const response = await request(app).get(`/api/goals/byGoalId/${testGoalId}`).send({});
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

    describe("given an incorrect goal id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get(`/api/goals/byGoalId/${fakeId}`).send({});
            expect(response.statusCode).toBe(404);
        });
    });
});

describe("PUT /api/goals/byGoalId", () => {
    describe("Given a correct goal ID and a valid request body", () => {
        test("should respond with a 200 status code and json header", async () => {
            const response = await request(app).put(`/api/goals/byGoalId/${testGoalId}`).send({
                description: "New Goal Description"
            });
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));

            const response2 = await request(app).get(`/api/goals/byGoalId/${testGoalId}`).send({ });
            const description = JSON.parse(response.text).goal.description;
            expect(description).toBe("New Goal Description");
            expect(response2.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

    describe("given an incorrect goal id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).put(`/api/goals/byGoalId/${fakeId}`).send({});
            expect(response.statusCode).toBe(404);
        });
    });
});

async function addMockData() {
    const testGoal = new Goal({
        title: "TEST GOAL 1",
        description: "TEST DESCRIPTION 1",
        goalType: "Performance", 
        status: "Complete",
        priorityValue: 1,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now() + 10),
        creatorUId: '63448bbbf55d476a2ee14d7b',
        commentIds: []
    });

    testGoalId = testGoal.id;
    await testGoal.save();
}

async function removeMockData() {
    await Goal.deleteMany({ _id: testGoalId });
}