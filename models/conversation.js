import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;
const conversationSchema = schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("conversation", conversationSchema);
