import request from 'supertest';
import createServer from '../utils/server';
import { mongoURI } from '../secret.js'
// import login from '../routes/login';

import mongoose from "mongoose";

// NODE_OPTIONS=--experimental-vm-modules npx jest

const app = createServer();
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(mongoURI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /login", () => {

    describe("given a username and password", () => {
        //should save username and password to database
        //should respond with a json object that contains a success message and the user object
        //should respond with a 200 status code
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/login").send({
                email: "vdsingh@umass.edu",
                password: "password"
            });
            expect(response.statusCode).toBe(200);
        });
        //should specify json in the content type header
        // test("should specify json in the content type header", async () => {
        //     const response = await request(app).post("/api/login").send({
        //         email: "vdsingh@umass.edu",
        //         password: "password"

        //     });
        //     expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        // });
    });

    describe("when the username and password is missing", () => {
        //should respond with a status code of 401
    });
});