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
        creatorUId,
        commentIds 
    } = req.body;
    
    // Initializing the Goal object with the data provided
    const newGoal = new Goal({
        title: title,
        description: description,
        goalType: goalType, 
        status: status,
        priorityValue: priorityValue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        creatorUId: creatorUId,
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
    const { goalId } = req.params;
    //TODO: Get rid of immutable fields here.
    const { 
        title, 
        description, 
        goalType, 
        status,
        priorityValue,
        startDate,
        endDate,
        creatorUId,
        commentIds 
    } = req.body;

    // Create Date objects if a new date is specified.
    const sDate = startDate ? new Date(startDate) : undefined;
    const eDate = endDate ? new Date(endDate) : undefined;

    Goal.findByIdAndUpdate(
        goalId,  
        { "title": title, "description": description, "goalType": goalType, 
        "status": status, "priorityValue": priorityValue, "startDate": sDate, "endDate": eDate, 
        "creatorUId": creatorUId, "commentIds": commentIds}, 
        {new: true},
        (err, goal) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (goal){
            res.status(200).send({message: "Successfully updated goal.", goal: goal});
        } else {
            res.status(404).send("That goal does not exist.");
        }
     });
};

export function deleteGoalById(req, res) {
    const { goalId } = req.params;
    Goal.findByIdAndDelete(goalId, (err, goal) => {
        if(err) {
            res.status(500).send(err);
        } else if (goal) {
            res.status(200).send({message: "Successfully deleted goal.", goal: goal});
        } else {
            res.status(404).send("That goal does not exist.");
        }
    });
};


export function readUserGoals(req, res) {
    const { userId } = req.params;
    const userGoals = Goal.find({ creatorUId: userId }, (err, goals) => {
        if(err) {
            res.status(500).send(err);
        } else if (goals) {
            res.status(200).send({message: "Successfully retrieved goals.", goals: goals});
        } else {
            res.status(404).send("That user does not exist.");
        }
    });
}