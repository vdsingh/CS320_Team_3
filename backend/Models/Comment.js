import mongoose from "mongoose";

const comment_schema = new mongoose.Schema({
  // Required Fields
  description: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    immutable: true,
    default: () => Date.now().toString(),
  },

  creatorName: {
    type: String,
    default: ""
  },

  // Relations:
  creatorUId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  goalUId: { type: mongoose.SchemaTypes.ObjectId, required: true },
});

comment_schema.index({
  goalUId: 1,
});

export default mongoose.model("Comments", comment_schema, "Comments");
