import Goal from "../Models/Goal.js";
import User from "../Models/User.js";

// Uploads a test goal (JSON format) to all users
export const upload_goal = function (user, goal) {
  console.log(user);
  if (user) {
    const creatorId = user._id.toString();
    console.log(creatorId);
    const obj = {
      title: goal.title,
      description: goal.description,
      goalType: goal.goalType,
      status: goal.status,
      priorityValue: goal.priorityValue,
      startDate: goal.startDate,
      endDate: goal.endDate,
      creatorId: user._id
    };
    const schema_goal = new Goal(obj);
    schema_goal.save((err, goal) => {
      if (err) {
        console.log(err);
      } else {
        console.log(goal);
      }
    });
  }
};
