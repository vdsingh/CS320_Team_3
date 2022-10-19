import Goal from '../Models/Goal.js'

export function createGoal(req, res) {
    // Getting the values from the request
    const { 
        title, 
        description, 
        goalType, 
        status,
        priorityValue,
        startDate,
        endDate,
        creatorId,
        commentIds 
    } = req.body
    
    // Initializing the Goal object with the data provided
    const newGoal = new Goal({
        title: title,
        description: description,
        goalType: goalType, 
        status: status,
        priorityValue: priorityValue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        creatorId: creatorId,
        commentIds: commentIds 
    });

    // Saving the Goal object in the database.
    newGoal.save((err, goal) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ message: "Successfully created goal.", goal: goal });
        }
    })
};

export function readGoalById(req, res) {
    const { goalId } = req.params;

    // Finding the Goal object in the DB by ID
    Goal.findById(goalId, (err, goal) => {
        if (err) {
            res.status(500).send(err);
        } else if (goal) {
            res.status(200).send({ message: "Successfully retrieved goal", goal: goal });
        } else {
            res.status(404).send("That goal does not exist.");
        }
    })
};

export function updateGoalById(req, res) {
    const { goalId,  } = req.body;
};

// TODO: Delete a goal by its ID
export function deleteGoalById(req, res) {
    const { goalId } = req.body;
};



//TODO: Get all goals of a specific user
export function readUserGoals(req, res) {

}

//TODO: delete all goals of a specific user
export function deleteUserGoals(req, res) {

}