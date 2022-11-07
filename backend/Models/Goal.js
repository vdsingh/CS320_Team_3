import mongoose from 'mongoose';

export default mongoose.model('Goals', new mongoose.Schema({
    // Required Fields

    //not updatable
    title: {
        type: String,
        required: true,
        immutable: true
    },
    //updatable
    description: {
        type: String,
        required: true
    },

    //not updatable
    goalType: {
        //Goal Types: Performance, Development, Personal
        type: String,
        required: true,
        immutable: true
    },

    //updatable
    status: {
        type: String,
        required: true
    },

    //updatable
    priorityValue: {
        type: Number,
        required: true
    },

    //not updatable
    startDate: {
        type: String,
        required: true,
        immutable: true
    },

    //not updatable
    endDate: {
        type: String,
        required: true,
        immutable: true
    },

    // Optional Fields
    creationDate: {
        type: String,
        immutable: true,
        default: () => Date.now().toString()
    },

    // Relations:
    creatorId: {
        type: mongoose.SchemaTypes.ObjectId
    }
    
}), 'Goals');