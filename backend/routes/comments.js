import Comment from '../Models/Comment.js'
import mongoose from 'mongoose';

export function createComment(req, res) {
    // Getting the values from the request
    const { 
        body,
        timeStamp,
        creatorId,
        goalId 
    } = req.body
    
    // Initializing the Comment object with the data provided
    const newComment = new Comment({
        body: body,
        timeStamp: new Date(timeStamp),
        creatorId: creatorId,
        goalId: goalId 
    });

    // Saving the Comment object in the database.
    newComment.save((err, comment) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ message: "Successfully created Comment.", comment: comment });
        }
    })
    //TODO Update goal with commentId
};


export function readGoalComments(req, res) {
    const { goalId } = req.params;
    const goalComments = Comment.find({ goalId: goalId }, (err, comments) => {
        if(err) {
            res.status(500).send(err);
        } else if (comments) {
            res.status(200).send({message: "Successfully retrieved comments.", comments: comments});
        } else {
            res.status(404).send("That comment does not exist.");
        }
    });
}

export function readCommentById(req, res) {
    const { commentId } = req.params;

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
    const { commentId } = req.params;
    const { 
        body,
        timeStamp,
        creatorId,
        goalId 
    } = req.body

    // Create Date objects if a new date is specified.
    const tStamp = timeStamp ? new Date(timeStamp) : undefined;

    Comment.findByIdAndUpdate(
        commentId,  
        { "body": body, "timestamp": tStamp, "creatorId": creatorId, "goalId": goalId}, 
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
    const { commentId } = req.params;
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