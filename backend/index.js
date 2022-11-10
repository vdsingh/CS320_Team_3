import { mongoURI } from "./secret.js";
import Joi from "joi";
import express from "express";
import MongoClient, { Db, ObjectId } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";

// Model Imports
import User from "./Models/User.js";
import Goal from "./Models/Goal.js";

// Route Imports
import login from "./routes/login.js";
import {
  createComment,
  readGoalComments,
  readCommentById,
  updateCommentById,
  deleteCommentById,
} from "./routes/comments.js";
import { readUserById, updateUserById } from "./routes/users.js";
import {
  createGoal,
  readGoalById,
  updateGoalById,
  deleteGoalById,
  readUserGoals,
} from "./routes/goals.js";

// MongoDB Upload Helper Functions
import data from "./Outback_Technology-employees.json" assert { type: "json" };
import { upload_user } from "./uploads/upload_user.js";
import { upload_goal } from "./uploads/upload_goal.js";

const app = express();
app.use(express.json());
app.use(cors());

/**
 * CRUD for comments
 */
app.post("/api/comments", createComment);
app.get("/api/comments/byGoalId/:goalId", readGoalComments);
app.get("/api/comments/byCommentId/:commentId", readCommentById);
app.put("/api/comments/byCommentId/:commentId", updateCommentById);
app.delete("/api/comments/:commentId", deleteCommentById);

/**
 * CRUD for users
 */
app.get("/api/users/:userId", readUserById);
app.put("/api/users/:userId", updateUserById);

/**
 * CRUD for goals
 */
app.post("/api/goals", createGoal);
app.get("/api/goals/byGoalId/:goalId", readGoalById);
app.put("/api/goals/byGoalId/:goalId", updateGoalById);
app.delete("/api/goals/byGoalId/:goalId", deleteGoalById);

app.get("/api/goals/byUserId/:userId", readUserGoals);

/**
 * Log in, uses the imported signin function from the routes folder.
 */
app.post("/api/login", login);

/**
 * Validates that a goal adheres to the goal schema.
 */
function validateGoal(goal) {
  // The schema that the goal object must adhere to
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(goal);
}

const start = async () => {
  try {
    // Mongoose Setup (Connection to MongoDB)
    await mongoose
      .connect(mongoURI)
      .then((arg) => {
        console.log("Connection to MongoDB successful.");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB", error);
      });

    // PORT setup
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`Application is listening on port ${port}...`)
    );

    // Test Code: save a new user to the DB.
    // const user = new User({employeeId: 1, companyId: 1, firstName: "Vik", lastName: "Singh", email: "vdsingh@umass.edu", password: "password", isManager: true});
    // await user.save().then((user) => console.log(user));
    // Test Code: save new goal to the DB.
    // const goal = new Goal({
    //   title: "Test Goal",
    //   description: "Test description",
    //   goalType: "Career",
    //   status: "Incomplete",
    //   priorityValue: 2,
    //   startDate: Date.now(),
    //   endDate: Date.now(),
    // });
    // await goal.save().then((goal) => console.log(goal));

    // Upload Users from data import
    // for (let i = 0; i < data.length; ++i) {
    //   const user = data[i];
    //   await User.find({ employeeId: user.managerId, comanyId: user.companyId }).then(
    //     (foundUser) => {
    //       let obj = {};
    //       if (foundUser.length == 0) {
    //         const schema_user = new User ({
    //           firstName: user.firstName,
    //           lastName: user.lastName,
    //           employeeId: user.employeeId,
    //           email: user.email,
    //           companyId: user.companyId,
    //           companyName: user.companyName,
    //           positionTitle: user.positionTitle,
    //           startDate: user.startDate,
    //           isManager: user.isManager,
    //           password: user.password,
    //         });
    //         schema_user.save().then((user) => console.log(user));
    //       } else {
    //         const schema_user = new User({
    //           firstName: user.firstName,
    //           lastName: user.lastName,
    //           employeeId: user.employeeId,
    //           email: user.email,
    //           companyId: user.companyId,
    //           companyName: user.companyName,
    //           positionTitle: user.positionTitle,
    //           startDate: user.startDate,
    //           isManager: user.isManager,
    //           password: user.password,
    //           managerId: user.managerId,
    //           managerUId: foundUser[0]._id,
    //         });
    //         schema_user.save().then((user) => console.log(user));
    //       }
    //     }
    //   );
    // }

    // Upload a bunch of goals
    // const goal = {
    //   title: "test goal",
    //   description: "test description",
    //   goalType: "Performance",
    //   status: "Incomplete",
    //   priorityValue: 1,
    //   startDate: "01-01-2001",
    //   endDate: "01-01-2001"
    // };
    // (await User.find({})).forEach((user) => upload_goal(user, goal));

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
