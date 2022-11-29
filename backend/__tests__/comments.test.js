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
import Comment from "../Models/Comment";

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
  const user = await User.findOne({ firstName: "JestUser" }).exec();
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
  await testGoal.save();
  // Making test comments
  const goal = await Goal.findOne({ title: "JestGoal" }).exec();
  const testComment1 = new Comment({
    description: "JestComment1",
    creatorUId: user._id,
    goalUId: goal._id,
  });
  const testComment2 = new Comment({
    description: "JestComment2",
    creatorUId: user._id,
    goalUId: goal._id,
  });
  const testComment3 = new Comment({
    description: "JestComment3",
    creatorUId: user._id,
    goalUId: goal._id,
  });
  await testComment1.save();
  await testComment2.save();
  await testComment3.save();
});

/* Closing database connection after each test and deleting test user/goal */
afterEach(async () => {
  // Delete test user
  await User.deleteMany({ firstName: "JestUser" });
  // Delete test goal
  await Goal.deleteMany({ title: "JestGoal" });
  // Delete test comments
  await Comment.deleteMany({ description: "JestComment1" });
  await Comment.deleteMany({ description: "JestComment2" });
  await Comment.deleteMany({ description: "JestComment3" });
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
      await Comment.deleteMany({ description: "JestComment" });
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
      await Comment.deleteMany({ description: "JestComment" });
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
      const comment = await User.findOne({ description: "JestComment" }).exec();
      expect(comment).not.toBeError;

      await Comment.deleteMany({ description: "JestComment" });
    });
  });
});

describe("GET /comments/byGoalId/:goalId", () => {
  describe("Given a goalId", () => {
    // If the goal doesn't exist, should return an error
    test("Should respond with a 404 status code", async () => {
      const response = await request(app).get(
        "/api/comments/byGoalId/633e058b0ac635fe4d8300ea"
      );
      expect(response.statusCode).toBe(404);
    });
    // If goals do exist then respond with a 200 status code
    test("Should respond with a 200 status code", async () => {
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const response = await request(app).get(
        "/api/comments/byGoalId/" + goal._id
      );
      expect(response.statusCode).toBe(200);
    });
    // If goals do exist then send the goals and a success status
    test("Should respond with a 200 status code", async () => {
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const response = await request(app).get(
        "/api/comments/byGoalId/" + goal._id
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.comments.length).toBe(3);
    });
  });
});

describe("GET /comments/byCommentId/:commentId", () => {
  describe("Given a commentId", () => {
    // If the comment does not exist, then should return an error
    test("Should respond with a 404 status code", async () => {
      const non_existant_Id = "633e058b0ac635fe4d8300ea";
      const response = await request(app).get(
        "/api/comments/byCommentId/" + non_existant_Id
      );
      expect(response.statusCode).toBe(404);
    });
    // If the comment exists, should return a success code and the comment
    test("Should respond with success code and JSON comment", async () => {
      const user = await User.findOne({ firstName: "JestUser" }).exec();
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const comment = await Comment.findOne({
        description: "JestComment1",
      }).exec();
      const response = await request(app).get(
        "/api/comments/byCommentId/" + comment._id
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.comment).toMatchObject({
        description: "JestComment1",
        creatorUId: user._id,
        goalUId: goal._id,
      });
    });
  });
});

describe("PUT /comments/byCommentId/:commentId", () => {
  describe("Given a commentId and a body, will update the comment", () => {
    // If the comment does not exist, then should return status 404
    test("Should respond withs status 404", async () => {
      const non_existant_Id = "633e058b0ac635fe4d8300ea";
      const response = await request(app)
        .put("/api/comments/byCommentId/" + non_existant_Id)
        .send({});
      expect(response.statusCode).toBe(404);
    });
    // If the comment exists, should return a success code and edited comment
    test("Should respond with status 200 and return edited comment", async () => {
      const user = await User.findOne({ firstName: "JestUser" }).exec();
      const goal = await Goal.findOne({ title: "JestGoal" }).exec();
      const comment = await Comment.findOne({
        description: "JestComment1",
      }).exec();
      const response = await request(app)
        .put("/api/comments/byCommentId/" + comment._id)
        .send({
          description: "JestComment2",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.comment).toMatchObject({
        description: "JestComment2",
        creatorUId: user._id,
        goalUId: goal._id,
      });
    });
  });
});

describe("DELETE /comments/byCommentId/:commentId", () => {
  describe("Given a commentId, should delete comment", () => {
    // If the comment doesn't exist, should return 404 status
    test("Should respond withs status 404", async () => {
      const non_existant_Id = "633e058b0ac635fe4d8300ea";
      const response = await request(app).delete(
        "/api/comments/byCommentId/" + non_existant_Id
      );
      expect(response.statusCode).toBe(404);
    });
    // If the comment exists, should respond with success status and delete comment
    test("Should respond with status 200 and comment should be deleted", async () => {
      const comment = await Comment.findOne({
        description: "JestComment1",
      }).exec();
      console.log(comment);
      const response = await request(app)
        .delete("/api/comments/byCommentId/" + comment._id);
      expect(response.statusCode).toBe(200);
      expect((await Comment.find({description: "JestComment1"}).exec()).length).toBe(0);
    });
  });
});
