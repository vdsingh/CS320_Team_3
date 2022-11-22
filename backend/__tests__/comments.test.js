import request from "supertest";
import createServer from "../utils/server";
import dotenv from "dotenv";

// Importing comment CRUDs
import { createComment } from "../routes/comments";
import { readGoalComments } from "../routes/comments";
import { readCommentById } from "../routes/comments";
import { updateCommentById } from "../routes/comments";
import { deleteCommentById } from "../routes/comments";

import mongoose from "mongoose";
import Goal from "../Models/Goal";
import User from "../Models/User";

const app = createServer();
/* Connecting to the database and creating test user/goal */
beforeEach(async () => {
  dotenv.config();
  await mongoose.connect(process.env.MONGO_URI);
  // Making test user
  const testUser = new User({
    firstName: "JestUser",
    lastName: "JestUser",
    employeeId: 0,
    isManager: true,
    companyId: 0,
    email: "JestUser",
    password: "JestUser",
  });
  await testUser.save();
  // Making test goal
  await User.findOne({ firstName: "JestUser" })
    .exec()
    .then((user) => {
      const testGoal = new Goal({
        title: "JestGoal",
        description: "JestGoal",
        goalType: "Performance",
        status: "Incomplete",
        priorityValue: 0,
        startDate: "0-0-0",
        endDate: "0-0-0",
        creationDate: "0-0-0",
        creatorUId: user._id,
      });
      testGoal.save();
    });
});

/* Closing database connection after each test and deleting test user/goal */
afterEach(async () => {
  // Delete test user
  await User.deleteOne({ firstName: "JestUser" });
  // Delete test goal
  await Goal.deleteOne({ title: "JestGoal" });
  await mongoose.connection.close();
});

describe("POST /comments", () => {
  describe("given a comment object with required fields", () => {
    // Should respnd with a 200 status code
    // Should respond with a json object that contains a success message and the user object
    // Shold save a comment to the database
    test("Should respond with a 200 status code", async () => {
      await User.findOne({ firstName: "JestUser" }).then(async (user) => {
        await Goal.findOne({ title: "JestGoal" }).then(async (goal) => {
          const response = await request(app).post("/api/comments").send({
            description: "JestComment",
            creatorUId: user._id,
            goalUId: goal._id,
          });
          expect(response.statusCode).toBe(200);
          await Comment.deleteOne({ description: "JestComment" });
        });
      });
    });
    // test("Should respond with a JSON object that contains a success message and the user object", () => {
    //     expect(response.body.message).toBe("Successfully created Comment.");
    //     expect(response.body.comment).toMatchObject({
    //         description: "JEST Comment",
    //         creatorUId: User.findOne({firstName: "JestUser"})._id,
    //         goalUId: Goal.findOne({title:"JestGoal"})._id,
    //       });
    // });
    // test("Should save a comment to the database", () => {
    //     const comment = Comment.find({description: "JEST Comment"});
    //     expect(comment.length).not.toBe(0);
    // });
  });
});
