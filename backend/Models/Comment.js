import mongoose from 'mongoose';

export default mongoose.model('Comments', new mongoose.Schema({
    // Required Fields
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

    // Relations:
    creatorId: mongoose.SchemaTypes.ObjectId,
    goalIDs: [mongoose.SchemaTypes.ObjectId] 
}), 'Comments');