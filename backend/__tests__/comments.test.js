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
import Comment from "../Models/Comment"

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
  const user = await User.findOne({ firstName: "JestUser" }).exec()
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
  // Making test comments
  const goal = await Goal.findOne({ title: "JestGoal" }).exec()
  const testComment1 = new Comment({
    description: "JestComment1",
    creatorUId: user._id,
    goalUId: goal._id
  });
  const testComment2 = new Comment({
    description: "JestComment2",
    creatorUId: user._id,
    goalUId: goal._id
  });
  const testComment3 = new Comment({
    description: "JestComment1",
    creatorUId: user._id,
    goalUId: goal._id
  });
  await testGoal.save()
});

/* Closing database connection after each test and deleting test user/goal */
afterEach(async () => {
  // Delete test user
  await User.remove({ firstName: "JestUser" });
  // Delete test goal
  await Goal.remove({ title: "JestGoal" });
  // Delete test comments
  
  await mongoose.connection.close();
});

describe("POST /comments", () => {
  describe("given a comment object with required fields", () => {
    // Should respond with a 200 status code
    test("Should respond with a 200 status code", async () => {
      const user = await User.findOne({ firstName: "JestUser" }).exec();
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const response = await request(app).post("/api/comments").send({
        description: "JestComment",
        creatorUId: user._id,
        goalUId: goal._id,
      });
      expect(response.statusCode).toBe(200);
      await Comment.remove({ description: "JestComment" });

    });
    // Should respond with a JSON object that contains a success message and the comment object
    test("Should respond with a JSON object that contains a success message and the comment object", async () => {
        const user = await User.findOne({ firstName: "JestUser" }).exec();
        const goal = await Goal.findOne({ title: "JestGoal" }).exec();
        const response = await request(app).post("/api/comments").send({
          description: "JestComment",
          creatorUId: user._id,
          goalUId: goal._id,
        });
        expect(response.body.message).toBe("Successfully created Comment.");
        expect(response.body.comment).toMatchObject({
            description: "JestComment",
            creatorUId: user._id,
            goalUId: goal._id,
          });
        await Comment.remove({ description: "JestComment" });
    });
    // Should add a comment to the database
    test("Should add a comment to the database", async () => {
      const user = await User.findOne({ firstName: "JestUser" }).exec();
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const response = await request(app).post("/api/comments").send({
        description: "JestComment",
        creatorUId: user._id,
        goalUId: goal._id,
      });
      const comment = await User.findOne({ description: "JestComment" }).exec()
      expect(comment).not.toBeError
      
      await Comment.remove({ description: "JestComment" });
  });
  });
});

describe("GET /comments/byGoalId/:goalId")
