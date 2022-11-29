import request from 'supertest';
import createServer from '../utils/server';
import dotenv from 'dotenv';
import mongoose from "mongoose";

const app = createServer();
/* Connecting to the database before each test. */
beforeEach(async () => {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_TEST_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

// app.post("/api/goals", createGoal);
// app.get("/api/goals/byGoalId/:goalId", readGoalById);
// app.put("/api/goals/byGoalId/:goalId", updateGoalById);
// app.delete("/api/goals/byGoalId/:goalId", deleteGoalById);

// app.get("/api/goals/byUserId/:userId", readUserGoals);

// title: title,
// description: description,
// goalType: goalType, 
// status: status,
// priorityValue: priorityValue,
// startDate: new Date(startDate),
// endDate: new Date(endDate),
// creatorId: creatorId,
// commentIds: commentIds 


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
            const response = await request(app).get("/api/goals/byGoalId/634ee6f8ff4584ed5282decd").send({});
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

    describe("given an incorrect goal id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get("/api/goals/byGoalId/634ee6f8ff4584ed5282decc").send({});
            expect(response.statusCode).toBe(404);
        });
    });
});

describe("PUT /api/goals/byGoalId", () => {
    describe("Given a correct goal ID and a valid request body", () => {
        test("should respond with a 200 status code and json header", async () => {
            const response = await request(app).put("/api/goals/byGoalId/634ee6f8ff4584ed5282decd").send({
                description: "New Goal Description"
            });
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        test("description should be updated", async () => {
            const response = await request(app).get("/api/goals/byGoalId/634ee6f8ff4584ed5282decd").send({ });
            const description = JSON.parse(response.text).goal.description;
            expect(description).toBe("New Goal Description");
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

    describe("given an incorrect goal id", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).put("/api/goals/byGoalId/634ee6f8ff4584ed5282decc").send({});
            expect(response.statusCode).toBe(404);
        });
    });
});