import Comment from '../Models/Comment.js' 
import User from '../Models/User.js'
import { readUserById } from './users.js';

export function createComment(req, res) {
    // Getting the values from the request
    const { 
        description,
        timeStamp,
        creatorUId,
        goalUId 
    } = req.body
    
    // Initializing the Comment object with the data provided
    const newComment = new Comment({
        description: description,
        timeStamp: new Date(timeStamp).toString(),
        creatorUId: creatorUId,
        goalUId: goalUId 
    });

    // Saving the Comment object in the database.
    newComment.save((err, comment) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ message: "Successfully created Comment.", comment: comment });
        }
    })
};


export function readGoalComments(req, res) {
    const goalUId = req.params.goalId;
    
    const goalComments = Comment.find({ goalUId: goalUId }, (err, comments) => {
        if(err) {
            res.status(500).send(err);
        } else if (comments.length != 0) {
            for (let i = 0; i < comments.length; i++) {
                const userID = comments[i].creatorUId;
                User.findById(userID, (err, user) => {
                    if (err) {
                        res.status(500).send(err);
                    } else if (user) {
                        comments[i].creatorName = user.firstName + " " + user.lastName;

                        if(i == comments.length - 1) {
                            res.status(200).send( {message: "Successfully retrieved comments.", comments: comments});
                        }
                    } else {
                        res.status(404).send("The user does not exist.");
                    }
                })
            }
        } else {
            res.status(404).send({message: "That comment does not exist.", comments: []});
        }
    });
}

export function readCommentById(req, res) {
    const commentId = req.params.commentId;

    // Finding the Comment object in the DB by ID
    Comment.findById(commentId, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else if (comment) {
            res.status(200).send({ message: "Successfully retrieved comment", comment: comment });
        } else {
            res.status(404).send("That comment does not exist.");
        }
    })
};

export function updateCommentById(req, res) {
    const commentId = req.params.commentId;
    const { 
        description,
        timeStamp,
        creatorUId,
        goalUId 
    } = req.body

    // Create Date objects if a new date is specified.
    const tStamp = timeStamp ? new Date(timeStamp) : undefined;

    Comment.findByIdAndUpdate(
        commentId,  
        { "description": description, "timestamp": tStamp, "creatorUId": creatorUId, "goalUId": goalUId}, 
        {new: true},
        (err, comment) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (comment){
            res.status(200).send({message: "Successfully updated Comment.", comment: comment});
        } else {
            res.status(404).send("That Comment does not exist.");
        }
     });
};

export function deleteCommentById(req, res) {
    const commentId = req.params.commentId;
    Comment.findByIdAndDelete(commentId, (err, comment) => {
        if(err) {
            res.status(500).send(err);
        } else if (comment) {
            res.status(200).send({message: "Successfully deleted comment.", comment: comment});
        } else {
            res.status(404).send("That comment does not exist.");
        }
    });
};