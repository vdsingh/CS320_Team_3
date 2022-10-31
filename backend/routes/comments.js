import Comment from '../Models/Comment.js'

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
};