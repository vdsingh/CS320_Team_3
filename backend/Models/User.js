import mongoose, { trusted } from "mongoose";

const user_schema = new mongoose.Schema({
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
  employeeId: {
    type: Number,
    required: true,
  },
  //not updatable
  isManager: {
    type: Boolean,
    required: true,
    immutable: true,
  },
  //not updatable
  companyId: {
    type: Number,
    required: true,
  },

  // Non-required Fields:
  companyName: String,
  positionTitle: String,
  startDate: String,
  managerId: Number,
  // Relations:
  managerUId: mongoose.SchemaTypes.ObjectId,
});

// Composite index by managerId and companyId for fast reportee querying 
user_schema.index(
  {
    managerId: 1,
    companyId: 1,
  },
);

export default mongoose.model("Users", user_schema, "Users");
