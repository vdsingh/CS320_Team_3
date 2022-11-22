// Route Imports
import login from "./routes/login.js";
import { findUserByManagerIDandCompanyID    , readUserById, updateUserById } from "./routes/users.js"
import { createGoal, readGoalById, updateGoalById, deleteGoalById, readUserGoals } from "./routes/goals.js"
import { createComment, readGoalComments, readCommentById, updateCommentById, deleteCommentById } from "./routes/comments.js";


export default function routes(app) {
    /**
     * CRUD for users
     */
    app.get("/api/users/:userId", readUserById);
    app.put("/api/users/:userId", updateUserById);
    app.get("/api/users", findUserByManagerIDandCompanyID);
    
    /**
     * CRUD for goals
     */
    app.post("/api/goals", createGoal);
    app.get("/api/goals/byGoalId/:goalId", readGoalById);
    app.put("/api/goals/byGoalId/:goalId", updateGoalById);
    app.delete("/api/goals/byGoalId/:goalId", deleteGoalById);
    app.get("/api/goals/byUserId/:userId", readUserGoals);

    /**
     * CRUD for comments
     */
    app.post("/api/comments", createComment);
    app.get("/api/comments/byGoalId/:goalId", readGoalComments);
    app.get("/api/comments/byCommentId/:commentId", readCommentById);
    app.put("/api/comments/byCommentId/:commentId", updateCommentById);
    app.delete("/api/comments/byCommentId/:commentId", deleteCommentById);

    /**
     * Log in, uses the imported signin function from the routes folder.
     */
    app.post("/api/login", login);
}