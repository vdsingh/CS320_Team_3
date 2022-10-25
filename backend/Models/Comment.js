<<<<<<< Updated upstream
import mongoose from 'mongoose';

export default mongoose.model('Comments', new mongoose.Schema({
    // Required Fields
    body: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

    // Relations:
    creatorID: mongoose.SchemaTypes.ObjectId,
    goalIDs: [mongoose.SchemaTypes.ObjectId] 
}), 'Comments');
=======
// TODO: Implement the Comment Model.

//
>>>>>>> Stashed changes
