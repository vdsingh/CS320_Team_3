import mongoose from 'mongoose';

const comment_schema = new mongoose.Schema({
    // Required Fields
    description: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        immutable: true,
        default: () => Date.now().toString()
    },

    // Relations:
    creatorUId: mongoose.SchemaTypes.ObjectId,
    goalUId: mongoose.SchemaTypes.ObjectId 
})

comment_schema.index({
    goalUId: 1
})

export default mongoose.model('Comments', comment_schema, 'Comments');