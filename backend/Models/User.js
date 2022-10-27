import mongoose from 'mongoose';

export default mongoose.model('Users', new mongoose.Schema({
    // Required Fields: 

    //updatable
    firstName: {
        type: String,
        required: true,
    },
    //updatable
    lastName: {
        type: String,
        required: true,
    },
    //updatable
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    //updatable
    password: {
        type: String,
        required: true,
    },
    //not updatable
    isManager: {
        type: Boolean,
        required: true,
        immutable: true,
    },
    //not updatable
    creationDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    //updatable - but not in update request
    lastUpdatedDate: {
        type: Date,
        default: () => Date.now(),
    },
    //updatable - but not in update request
    lastLoginDate: {
        type: Date,
        default: () => Date.now(),
    },

    // Non-required Fields:
    companyId: Number,
    companyName: String,
    positionTitle: String,
    startDate: String,

    // Relations:
    managerId: mongoose.SchemaTypes.ObjectId,
    subordinateIDs: [mongoose.SchemaTypes.ObjectId],
    goalIDs: [mongoose.SchemaTypes.ObjectId],
}), 'Users');