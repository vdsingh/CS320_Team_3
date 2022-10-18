import { mongoURI } from "./secret.js";
import Joi from "joi";
import express from "express";
import MongoClient from "mongodb";
import mongoose from "mongoose";

// Model Imports
import User from "./Models/User.js";
import Goal from "./Models/Goal.js";

// Route Imports
import login from "./routes/login.js";

const app = express();
app.use(express.json());

// Mock database
const goals = [
  { id: 1, name: "goal 1" },
  { id: 2, name: "goal 2" },
  { id: 3, name: "goal 3" },
];

/**
 * Retrieve all of the goals in our array
 */
app.get("/api/goals", (req, res) => {
  // Send back all of the goals in the database.
  res.send(goals);
});

/**
 * Retrieve a specific goal using its ID.
 */
app.get("/api/goals/:goalID", (req, res) => {
  // Find the goal in the database by its id.
  const goal = goals.find((goal) => goal.id === parseInt(req.params.goalID));
  //If the goal does not exist, send back a 404 error.
  if (!goal)
    return res.status(404).send("The goal with the given ID was not found.");
  // Send back the goal object.
  res.send(goal);
});

/**
 * Add a new goal to the database.
 */
app.post("/api/goals", (req, res) => {
  // Validate the goal object in the request.
  const { error } = validateGoal(req.body);
  // Send an error if the goal object is not valid.
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new goal object with information from the request.
  const goal = {
    id: goals.length + 1,
    name: req.body.name,
  };

  // Add the goal object to the database.
  goals.push(goal);

  // Send back the goal that we added to the database.
  res.send(goal);
});

/**
 * Update an already existing goal in the database.
 */
app.put("/api/goals/:id", (req, res) => {
  // Look up the goal
  const goal = goals.find((goal) => goal.id === parseInt(req.params.goalID));
  // If it doesn't exist, return a 404 error.
  if (!goal)
    return res.status(404).send("The goal with the given ID was not found.");

  const { error } = validateGoal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update Goal
  goal.name = req.body.name;

  // Send back the updated goal
  res.send(goal);
});

/**
 * Delete an existing goal in the database.
 */
app.delete("/api/goals/:id", (req, res) => {
  // Look up the goal
  const goal = goals.find((goal) => goal.id === parseInt(req.params.goalID));
  // If it doesn't exist, return a 404 error.
  if (!goal)
    return res.status(404).send("The goal with the given ID was not found.");

  // Remove the goal from the database
  const goalIndex = goals.indexOf(goal);
  goals.splice(goalIndex, 1);

  // Send back the goal that was deleted
  res.send(goal);
});

/**
 * Log in, uses the imported signin function from the routes folder.
 */
app.get("/login", login);

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
    // const user = new User({firstName: "Vik", lastName: "Singh", email: "vdsingh@umass.edu", password: "password", isManager: true});
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
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
