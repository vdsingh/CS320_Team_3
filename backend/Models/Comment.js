import mongoose from 'mongoose';

export default mongoose.model('Comments', new mongoose.Schema({
    // Required Fields
    description: {
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
    goalID: mongoose.SchemaTypes.ObjectId 
}), 'Comments');