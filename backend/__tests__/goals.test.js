import request from 'supertest';
import createServer from '../utils/server';
import dotenv from 'dotenv';
import mongoose from "mongoose";

// Models
import Goal from '../Models/Goal';
import User from '../Models/User';


const app = createServer();
var testGoalId = "";
var testUserId = "";
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
                creatorUId: testUserId,
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

describe("GET /api/goals/byUserId", () => {
    describe("Given a correct user ID", () => {
        test("should respond with a 200 status code, a json header, and a goals list of length 1", async () => {
            const response = await request(app).get(`/api/goals/byUserId/${testUserId}`).send({});
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));

            const goals = JSON.parse(response.text).goals;
            expect(goals.length).toBe(1);
            expect(goals[0]._id).toBe(testGoalId.toString());
        });
    });

    describe("given an incorrectly formatted ID", () => {
        test("should respond with a 500 status code", async () => {
            const response = await request(app).get(`/api/goals/byUserId/abc}`).send({});
            expect(response.statusCode).toBe(500);
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

    const testUser = new User({
        firstName: "JestUser",
        lastName: "JestUser",
        employeeId: 0,
        isManager: true,
        companyId: 0,
        email: "JestUser",
        password: "JestUser",
    });
    testUserId = testUser._id;
    await testUser.save();

    const testGoal = new Goal({
        title: "TEST GOAL 1",
        description: "TEST DESCRIPTION 1",
        goalType: "Performance", 
        status: "Complete",
        priorityValue: 1,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now() + 10),
        creatorUId: testUser._id,
        commentIds: []
    });

    testGoalId = testGoal._id;
    await testGoal.save();
}

async function removeMockData() {
    await Goal.deleteMany({ _id: testGoalId });
    await User.deleteMany({ _id: testUserId });
}