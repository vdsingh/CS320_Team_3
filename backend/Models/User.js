import mongoose from 'mongoose';

export default mongoose.model('Users', new mongoose.Schema({
    // Required Fields: 
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isManager: {
        type: Boolean,
        required: true,
    },
    creationDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    lastUpdatedDate: {
        type: Date,
        default: () => Date.now(),
    },
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