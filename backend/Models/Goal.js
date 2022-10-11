import mongoose from 'mongoose';

export default mongoose.model('Goals', new mongoose.Schema({
    // Required Fields
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goalType: {
        type: String,
        required: true,
        default: () => "Performance"
    },
    status: {
        type: String,
        required: true
    },
    priorityValue: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    endDate: {
        type: Date,
        required: true,
    },

    // Optional Fields
    creationDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

    // Relations:
    creatorId: mongoose.SchemaTypes.ObjectId,
    commentIDs: [mongoose.SchemaTypes.ObjectId]
}), 'Goals');