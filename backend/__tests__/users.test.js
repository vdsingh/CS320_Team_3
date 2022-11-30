import request from "supertest";
import createServer from "../utils/server";
import dotenv from "dotenv";

import mongoose from "mongoose";
import Goal from "../Models/Goal";
import User from "../Models/User";
import { JsonableValue } from "ts-jest";


const app = createServer();
/* Connecting to the database and creating test user/goal */
beforeEach(async () => {
  dotenv.config();
  await mongoose.connect(process.env.MONGO_TEST_URI);
  // Making test user
  const testUser = new User({
    firstName: "JestUser1",
    lastName: "JestUser1",
    employeeId: 1,
    isManager: false,
    managerId: 3,
    companyId: 2,
    email: "jestuser1",
    password: "JestUser1",
  });

  const testUser1 = new User({
    firstName: "JestUser2",
    lastName: "JestUser2",
    employeeId: 2,
    isManager: false,
    managerId: 3,
    companyId: 2,
    email: "jestuser2",
    password: "JestUser2",
  });

  const testUser2 = new User({
    firstName: "JestUser3",
    lastName: "JestUser3",
    employeeId: 3,
    isManager: true,
    companyId: 2,
    email: "jestuser3",
    password: "JestUser3",
  });

  await testUser.save();
  await testUser1.save();
  await testUser2.save();
});

afterEach(async () => {
    // Delete test user
    await User.deleteMany({ firstName: "JestUser1" });
    await User.deleteMany({firstName: "JestUser2"});
    await User.deleteMany({firstName: "JestUser3"});
    await mongoose.connection.close();
});


describe("GET /users/byUserId/:userId", () => {
    describe("Given a userId", () => {
      // If the user doesn't exist, should return an error
      test("Should respond with a 500 status code", async () => {
        const response = await request(app).get(
          "/api/users/byUserId/633e058b0ac635fe4d8333eq"
        );
        expect(response.statusCode).toBe(500);
      });
      
      test("Should respond with a 200 status code and return the user", async () => {
        const user = await User.findOne({ firstName: "JestUser1" }).exec();
        const response = await request(app).get(
          "/api/users/byUserId/" + user._id
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toMatchObject({
            email: "jestuser1",
            password: "JestUser1"
          });
      });

      test("Should respond with a 404 status code", async () => {
        const response = await request(app).get(
        "/api/users/byUserId/6386d133623775c57830f13e"
        );
        expect(response.statusCode).toBe(404);
      });
    });
  });


  describe("GET /api/users/:managerId/:companyId", () => {
    describe("Given a managerId and companyId", () => {
      test("Should respond with a 404 status code", async () => {
        const response = await request(app).get(
          "/api/users/1/0"
        );
        expect(response.statusCode).toBe(404);
      });

      test("Should respond with a 200 status code and return a list of users under that manager", async () => {
        const response = await request(app).get(
          "/api/users/3/2"
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.user.length).toBe(2);
      });
    });
  });

  describe("GET /api/users/getUser/:userId/:companyId", () => {
    describe("Given a userId and companyId", () => {
      test("Should respond with a 404 status code", async () => {
        const response = await request(app).get(
          "/api/users/getUser/1/0"
        );
        expect(response.statusCode).toBe(404);
      });

      test("Should respond with a 200 status code and return the manager for that user", async () => {
        const user = await User.findOne({ firstName: "JestUser1" }).exec();
        console.log(user)
        const response = await request(app).get(
          "/api/users/getUser/" + user.managerId + "/" + user.companyId
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toMatchObject({
            email: "jestuser3",
            password: "JestUser3"
          });
      });
    });
  });