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

describe("POST /login", () => {
    describe("given a username and password", () => {
        test("correct credentials: should respond with a 200 status code and json header", async () => {
            const response = await request(app).post("/api/login").send({
                email: "vdsingh@umass.edu",
                password: "password"
            });
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        test("incorrect credentials: should respond with a 401 status code", async () => {
            const response = await request(app).post("/api/login").send({
                email: "invalid",
                password: "invalid"
            });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("when the username and password is missing", () => {
        //should respond with a status code of 401
        test("incorrect request: should respond with a 401 status code", async () => {
            const response = await request(app).post("/api/login").send({});
            expect(response.statusCode).toBe(401);
        });
    });
});